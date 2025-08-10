const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = decoded.userId;
        next();
      } else {
        res.status(400).json({ msg: "Loging failed try again" });
      }
    } else {
      res.status(400).json({ msg: "Unauthorized access" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
module.exports = authMiddleware;
