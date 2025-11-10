import mongoose from "mongoose";
import dotenv from "dotenv";
import ParkingSpace from "./src/models/ParkingSpace.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await ParkingSpace.insertMany([
    { location: "Mall A", capacity: 50, available: true, price: 50 },
    { location: "Airport B", capacity: 100, available: true, price: 100 }
  ]);
  console.log("Sample parking spaces added");
  process.exit();
});