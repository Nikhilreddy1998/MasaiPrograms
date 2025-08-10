const OrderModel = require("../models/order.model");
const UserModel = require("../models/user.model");

exports.placeOrder = async (req, res) => {
  const { dishName } = req.body;
  try {
    const chefs = await UserModel.find({ role: "chef" });
    if (chefs.length === 0) {
      return res.status(400).json({ msg: "No chefs available right now" });
    }
    const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
    const order = await OrderModel.create({
      dishName,
      user: req.user._id,
      chef: randomChef._id
    });
    res.status(201).json({ msg: "Order placed!", order });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).populate("chef", "email");
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getChefOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ chef: req.user._id });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await OrderModel.findById(orderId);
  if (!order || order.chef.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: "Unauthorized" });
  }
  order.status = status;
  await order.save();
  res.json({ msg: "Status updated", order });
};