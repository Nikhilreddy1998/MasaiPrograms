const express = require("express");
const { signupRoute, loginRoute, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const nodemailer = require("nodemailer");
const authRouter = express.Router();

// signup route
authRouter.post("/signup", signupRoute);

// Login route
authRouter.post("/login", loginRoute);

// Forget Route
authRouter.post("/forgot-password", forgotPassword);

// Reset route
authRouter.post("/reset-password/:token", resetPassword);

module.exports = authRouter;
