import express, { Request, Response } from "express";
import * as customerController from "../controllers/customerController";
import * as vendorController from "../controllers/vendorController";

const router = express.Router();
router.use(express.json())

// Sample route
router.get("/sample", (req, res) => {
  res.send({ message: "This is a sample response" });
});

// API endpoint to browse all of the available vendors
router.get("/vendors", vendorController.index);

// API endpoint to view all of the associated vendors
router.get("/loyalty-cards", customerController.getAllCards);

// API endpoint to get all of the rewards for a given vendor
router.get("/rewards/:vendorID", vendorController.getRewards);

// API endpoint to add a new loyalty card to a users wallet
router.post("/add-loyalty-card", customerController.addCard)

// API endpoint to get all redeemables
router.get("/redeemables", customerController.getRedeemables)


export default router;
