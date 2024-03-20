import express, { Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  editVendor,
  getVendor,
  getAllRewardsOfVendor,
  getVendorFromClerkID,
  editVendorLoyaltyProgram,
  editVendorReward,
  addVendorReward,
  deleteVendorReward,
  getVendorLoyaltyProgramInfo,
  getStampDesigns,
  displayOnboardingCards,
  setOnboardingStatusComplete,
  checkIsBusinessInformationComplete,
} from "../../database/db_interface";

const router = express.Router();

//these are used for file uploading and such
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

interface MulterFile {
  [fieldname: string]: Express.Multer.File[];
}

const s3 = new S3Client({
  region: process.env.BUCKET_REGION || "",
  credentials: {
    accessKeyId: process.env.BUCKET_LOCAL_ACCESS_KEY || "",
    secretAccessKey: process.env.BUCKET_LOCAL_SECRET_ACCESS_KEY || "",
  },
});

// Sample route
router.get("/sample", (req: Request, res: Response) => {
  res.send({ message: "This is a sample response" });
});

//reference code for how to get a url for an image stored in S3
router.get("/test-s3-get", async (req: Request, res: Response) => {
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: "Zhang'sBakery", //this is the imageName that will be stored into the database
    }),
    { expiresIn: 3600 }
  );

  res.send({ url: url });
});

router.get("/profile", async (req: Request, res: Response) => {
  let profileData = await getVendor(req.auth.userId);
  res.send(profileData);
});

// In your route handler
router.post(
  "/profile",
  upload.fields([
    { name: "business_image", maxCount: 1 },
    { name: "business_logo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const files = req.files as MulterFile; // Type assertion here
    const businessImage = files.business_image ? files.business_image[0] : null;
    const businessLogo = files.business_logo ? files.business_logo[0] : null;
    const vendor = await getVendorFromClerkID(req.auth.userId);
    const vendor_id = vendor![0].vendor_id;

    let imageName = "";
    let logoName = "";

    if (businessImage) {
      imageName = randomImageName();

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: imageName,
          Body: businessImage?.buffer,
          ContentType: businessImage?.mimetype,
        })
      );
    }

    if (businessLogo) {
      logoName = randomImageName();

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: logoName,
          Body: businessLogo?.buffer,
          ContentType: businessLogo?.mimetype,
        })
      );
    }

    let body = req.body;

    await editVendor(
      req.auth.userId,
      body.name,
      body.business_email,
      body.business_phone,
      body.address,
      body.city,
      body.province,
      body.postal_code,
      imageName,
      logoName,
      body.description,
      body.merchant_id,
      body.clover_api_key
    );

    const isProfileComplete = checkIsBusinessInformationComplete(body);

    if (isProfileComplete && businessImage && businessLogo) {
      // Update the onboarding completion status
      await setOnboardingStatusComplete(vendor_id, 2);
    }

    res.status(200).json({ message: "Profile updated successfully" });
  }
);

// API routes for retrieving onboarding
router.get("/api/onboarding", async (req: Request, res: Response) => {
  try {
    const vendor = await getVendorFromClerkID(req.auth.userId);
    const vendor_id = vendor![0].vendor_id;
    const results = await displayOnboardingCards(vendor_id);

    res.status(200).json({ results });
  } catch (Error: unknown) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

router.get("/loyalty-program", async (req: Request, res: Response) => {
  try {
    const vendor = await getVendorFromClerkID(req.auth.userId);
    const vendor_id = vendor![0].vendor_id;
    const loyaltyInfo = await getVendorLoyaltyProgramInfo(vendor_id);
    const rewards = await getAllRewardsOfVendor(vendor_id);

    if (loyaltyInfo![0]?.businessLogo == null) {
      // Checks for both undefined and null
      throw new Error("businessLogo is null or undefined");
    }

    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: loyaltyInfo![0].businessLogo, //this is the imageName that will be stored into the database
      }),
      { expiresIn: 3600 }
    );

    res.status(200).json({
      vendor_id: vendor_id,
      businessName: loyaltyInfo![0].businessName,
      businessLogo: url,
      businessPhone: loyaltyInfo![0].businessPhone,
      businessEmail: loyaltyInfo![0].businessEmail,
      stampLife: loyaltyInfo![0].stampLife,
      stampCount: loyaltyInfo![0].stampCount,
      scaleAmount: loyaltyInfo![0].scaleAmount,
      definedRewards: rewards,
      cardLayout: loyaltyInfo![0].cardLayout,
      stampDesignId: loyaltyInfo![0].stampDesignId,
      color1: loyaltyInfo![0].color1,
      color2: loyaltyInfo![0].color2,
      color3: loyaltyInfo![0].color3,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: "User does not exist" });
  }
});

router.get("/stamp-design", async (req: Request, res: Response) => {
  try {
    const stampDesigns = await getStampDesigns();

    res.status(200).json({
      stampDesigns: stampDesigns,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: "User does not exist" });
  }
});

router.post("/loyalty-program", async (req: Request, res: Response) => {
  try {
    let body = req.body;

    //get the initial vendor id
    const vendor = await getVendorFromClerkID(req.auth.userId);
    const vendor_id = vendor![0].vendor_id;

    //update basic values like stampLife, stampCount, scaleAmount
    await editVendorLoyaltyProgram(
      vendor_id,
      body.stampLife,
      body.stampCount,
      body.scaleAmount,
      body.cardLayout,
      body.stampDesignId,
      body.color1,
      body.color2,
      body.color3
    );

    //loop through defined rewards dealing with new rewards and updated rewards
    body.definedRewards.map(
      ({
        reward_id,
        title,
        requiredStamps,
      }: {
        reward_id: number | null;
        title: string;
        requiredStamps: number;
      }) => {
        reward_id
          ? editVendorReward(reward_id, title, requiredStamps)
          : addVendorReward(vendor_id, title, requiredStamps);
      }
    );

    let currentRewards = await getAllRewardsOfVendor(vendor_id);
    const rewardsToDelete = currentRewards!.filter(
      (currentReward) =>
        !body.definedRewards.some(
          (definedReward: { reward_id: number }) =>
            definedReward.reward_id === currentReward.reward_id
        )
    );

    rewardsToDelete.map((item) => {
      deleteVendorReward(item.reward_id);
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (Error: unknown) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

export default router;
