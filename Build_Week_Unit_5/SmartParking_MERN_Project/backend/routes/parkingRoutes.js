import express from "express";
import Parking from "../src/models/parkingModel.js";

const router = express.Router();

// Get all parking spaces
router.get("/", async (req, res) => {
  const spaces = await Parking.find();
  res.json(spaces);
});

// Add sample parking spaces (for demo)
router.post("/seed", async (req, res) => {
  await Parking.deleteMany();
  const data = [
    { location: "Downtown Plaza", capacity: 50, price: 100, available: true },
    { location: "Airport Lot", capacity: 200, price: 200, available: true },
    { location: "Mall Basement", capacity: 80, price: 150, available: true },
  ];
  await Parking.insertMany(data);
  res.json({ message: "Sample data inserted" });
});

export default router;
