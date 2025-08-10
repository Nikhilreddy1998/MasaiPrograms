const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { createDish, updateDish, deleteDish, getDishes } = require("../controllers/dish.controller");
const dishRouter = express.Router();


dishRouter.post("/", authMiddleware, roleMiddleware(["admin"]), createDish);
dishRouter.get("/", getDishes);
dishRouter.put("/:id", authMiddleware,roleMiddleware(["admin"]), updateDish);
dishRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteDish);

module.exports = dishRouter;
