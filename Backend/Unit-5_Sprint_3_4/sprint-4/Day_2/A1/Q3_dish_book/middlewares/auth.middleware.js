const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(404).json({ msg: "Invalid token" });
    req.user = await UserModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ err: "Something went wrong", error: error.message });
  }
};

module.exports = authMiddleware;
