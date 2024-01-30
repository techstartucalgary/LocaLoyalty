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

router.get("/profile", (req: Request, res: Response) => {
  const dummyData = {
    businessName: "Zhang's Bakery",
    address: "123 real address NE",
    city: "Calgary",
    province: "Alberta",
    postalCode: "A1B2C3",
    merchantID: "123456789",
    apiKey: "opqwieop12p3oiop",
  };

  //this is what you would use to query db for the specific user
  //console.log(req.auth.userId);

  res.send(dummyData);
});

// In your route handler
router.post(
  "/profile",
  upload.fields([
    { name: "businessImage", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const files = req.files as MulterFile; // Type assertion here

    const businessImage = files.businessImage ? files.businessImage[0] : null;
    const businessLogo = files.businessLogo ? files.businessLogo[0] : null;

    console.log(req.auth.userId);
    console.log(req.body);
    console.log(businessImage);
    console.log(businessLogo);

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

    //to do connect to database
    //we will need to store the imageName and logoName so that we can retrieve the file back later on subsequent calls

    res.status(200).json({ message: "Profile updated successfully" });
  }
);

export default router;
