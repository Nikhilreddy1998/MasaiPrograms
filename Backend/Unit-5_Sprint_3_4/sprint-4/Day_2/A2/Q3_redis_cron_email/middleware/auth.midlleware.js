const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(404).json({ message: "Token not found" });
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(403).json({ message: "Unauthorized token" });
    req.user = decoded.userId
    next();
  } catch (error) {
    if(error.message="jwt expired"){
      res.status(403).json({ error: "Token expired"});
    }else
    res.status(500).json({ error: "Something went wrong"});
  }
};

module.exports = authMiddleware;
