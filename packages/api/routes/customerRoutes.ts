import express, { Request, Response } from "express";
import * as customerController from "../controllers/customerController";
import * as vendorController from "../controllers/vendorController";

const router = express.Router();

// Sample route
router.get("/sample", (req, res) => {
  res.send({ message: "This is a sample response" });
});

// API endpoint to browse all of the available vendors
router.get("/vendors", vendorController.index);

// API endpoint to view all of the associated vendors
// router.get("/cards", customerController.getAllCards);

export default router;
