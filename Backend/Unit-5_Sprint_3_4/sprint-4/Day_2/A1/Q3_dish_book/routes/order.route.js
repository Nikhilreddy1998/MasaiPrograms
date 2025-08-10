const express = require("express");
const roleMiddleware = require("../middlewares/role.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const { placeOrder, getUserOrders, getChefOrders, updateOrderStatus } = require("../controllers/order.controller");
const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, roleMiddleware(["user"]), placeOrder);
orderRouter.get("/my", authMiddleware, roleMiddleware(["user"]), getUserOrders);
orderRouter.get("/chef", authMiddleware, roleMiddleware(["chef"]), getChefOrders);
orderRouter.patch("/status/:orderId", authMiddleware,roleMiddleware(["chef"]), updateOrderStatus);

module.exports = orderRouter;
