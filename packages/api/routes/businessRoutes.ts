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
import { editVendor, getVendor } from "../../database/db_interface";

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

    res.status(200).json({ message: "Profile updated successfully" });
  }
);

router.get("/loyalty-program", async (req: Request, res: Response) => {
  let profileData = await getVendor(req.auth.userId);
  res.send(profileData);
});

export default router;
