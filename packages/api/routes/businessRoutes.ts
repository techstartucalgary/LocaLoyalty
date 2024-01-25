import express, { Request, Response } from "express";
import * as vendorController from "../controllers/vendorController";

const router = express.Router();

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

router.post("/profile", (req: Request, res: Response) => {
  //this is what you would use to query db for the specific user
  console.log(req.auth.userId);

  //This is the content you would use to update the database
  console.log(req.body);

  res.status(200).json({ message: "dummy success" });

  //res.sendStatus(500).json({ message: "dummy error" });
});

router.post("/vendor", vendorController.addCard);

export default router;
