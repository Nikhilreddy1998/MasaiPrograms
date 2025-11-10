import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
  location: String,
  capacity: Number,
  price: Number,
  available: Boolean,
});

export default mongoose.model("Parking", parkingSchema);
