import express, { Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import QRCode from "qrcode";
const PDFDocument = require("pdfkit");
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
  getBusinessQrCode,
  updateBusinessQrCode,
} from "../../database/db_interface_vendor";

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
    try {
      const files = req.files as MulterFile; // Type assertion here
      const businessImage = files.business_image
        ? files.business_image[0]
        : null;
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
        body.description
      );

      const isProfileComplete = checkIsBusinessInformationComplete(body);

      if (isProfileComplete && businessImage && businessLogo) {
        // Update the onboarding completion status
        await setOnboardingStatusComplete(vendor_id, 2);
      }

      res.status(200).json({ message: "Profile updated successfully" });
    } catch {
      res.status(500).json({ message: "Something went wrong..." });
    }
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

// Helper function for "/random-key" route
// Returns 16 bytes encoded as a hexadecimal string
function generateRandomKey(length: number): string {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  let hexString = "";
  randomBytes.forEach((byte: number) => {
    hexString += byte.toString(16).padStart(2, "0");
  });
  return hexString;
}

//helper to generate the pdf version of the QR Code
function generateQRCode(qr_code_text: string, res: Response) {
  //creating the actual qr code
  // Generate QR code as a data buffer
  QRCode.toBuffer(
    qr_code_text!,
    {
      type: "png",
      color: {
        dark: "#000000", // Black dots
        light: "#FFFFFF", // White background
      },
    },
    function (err, buffer) {
      if (err) {
        console.error("Failed to generate QR code:", err);
        return res.status(500).send("Failed to generate QR code.");
      }

      // Create a PDF document
      let doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="localoyalty_secret_qr.pdf"'
      );

      // Pipe the PDF into the HTTP response
      doc.pipe(res);

      // Add any additional PDF content here
      doc
        .fontSize(30)
        .text(
          "Warning! This is the secret key for giving stamps. Do not keep out in the public"
        );

      // Add QR code image from buffer
      doc.image(buffer, {
        fit: [250, 250], // Controls the size to fit the image into
        align: "center", // Horizontal alignment (options: 'center', 'left', 'right')
        valign: "center", // Vertical alignment (options: 'top', 'center', 'bottom')
      });

      // Finalize the PDF and end the document
      doc.end();
    }
  );
}

router.get("/qr", async (req: Request, res: Response) => {
  try {
    //query db for qr_code field in the db
    let qr_code_text = await getBusinessQrCode(req.auth.userId);

    //if qr code text does not exist, generate one and insert into the correct spot in the vendor table
    if (!qr_code_text || qr_code_text == "") {
      qr_code_text = generateRandomKey(16);
      await updateBusinessQrCode(req.auth.userId, qr_code_text);
    }

    generateQRCode(qr_code_text, res);
  } catch (Error: unknown) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

router.post("/qr", async (req: Request, res: Response) => {
  try {
    const qr_code_text = generateRandomKey(16);
    await updateBusinessQrCode(req.auth.userId, qr_code_text);
    generateQRCode(qr_code_text, res);
  } catch (error) {
    console.error("Failed to generate random key:", error);
    res.status(500).json({ message: "Failed to generate random key." });
  }
});

export default router;
