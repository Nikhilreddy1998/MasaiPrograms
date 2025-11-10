import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: String,
  parkingSpaceId: String,
  date: String,
  status: String,
});

export default mongoose.model("Booking", bookingSchema);
