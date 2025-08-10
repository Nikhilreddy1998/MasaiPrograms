var jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    let decoded;
    try {
      let token = req.headers?.authorization?.split(" ")[1];
      if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } else {
        res.status(400).json({ message: "Token Not Found, Please Login Again" });
      }
    } catch (err) {
      if (err.message == "jwt expired") {
        let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
        let refreshTokenDeocded = jwt.verify(
          refreshToken,
          process.env.JWT_SECRET
        );
        if (refreshTokenDeocded) {
          console.log("Access Token Expired, New Token Generate");
          let newAccessToken = jwt.sign(
            {
              userId: refreshTokenDeocded.userId,
              role: refreshTokenDeocded.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 30 }
          );
          decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
        } else {
          res.status(403).json({ message: "Token Expired, Login Again" });
        }
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
    if (decoded) {
      if (role.includes(decoded.role)) {
        req.user = decoded.userId;
        next();
      } else {
        res.status(401).json({ message: "Unauthorised...." });
      }
    } else {
      res.status(403).json({ message: "Login Failed, Please Login Again" });
    }
  };
};

module.exports = authMiddleware;
