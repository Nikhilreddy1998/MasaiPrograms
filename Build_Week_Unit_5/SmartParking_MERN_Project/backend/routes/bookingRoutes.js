import express from "express";
import Booking from "../src/models/bookingModel.js";

const router = express.Router();

// Book parking
router.post("/book", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
