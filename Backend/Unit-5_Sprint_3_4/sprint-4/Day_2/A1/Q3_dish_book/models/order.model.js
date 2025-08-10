const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
    default: "Order Received",
  },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel