import express from "express";
import Payment from "../src/models/paymentModel.js";

const router = express.Router();

// Mock payment
router.post("/pay", async (req, res) => {
  try {
    const { userId, bookingId, amount } = req.body;
    const payment = await Payment.create({ userId, bookingId, amount });
    res.json({ message: "Mock payment success", payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
