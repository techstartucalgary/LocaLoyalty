import express, { Request, Response } from "express";

const router = express.Router();

// Sample route
router.get("/sample", (req: Request, res: Response) => {
  res.send({ message: "This is a sample response" });
});

export default router;
