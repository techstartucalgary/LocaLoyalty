import express from "express";
const router = express.Router();

// Sample route
router.get("/sample", (req, res) => {
  res.send({ message: "This is a sample response" });
});

export default router;
