import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: String,
  bookingId: String,
  amount: Number,
  status: { type: String, default: "success" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
