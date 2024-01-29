import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();

//these are used for file uploading and such
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sample route
router.get("/sample", (req: Request, res: Response) => {
  res.send({ message: "This is a sample response" });
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

interface MulterFile {
  [fieldname: string]: Express.Multer.File[];
}

// In your route handler
router.post(
  "/profile",
  upload.fields([
    { name: "businessImage", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
  ]),
  (req: Request, res: Response) => {
    const files = req.files as MulterFile; // Type assertion here

    const businessImage = files.businessImage ? files.businessImage[0] : null;
    const businessLogo = files.businessLogo ? files.businessLogo[0] : null;

    console.log(req.auth.userId);
    console.log(req.body);
    console.log(businessImage);
    console.log(businessLogo);

    res.status(200).json({ message: "Profile updated successfully" });
  }
);

export default router;
