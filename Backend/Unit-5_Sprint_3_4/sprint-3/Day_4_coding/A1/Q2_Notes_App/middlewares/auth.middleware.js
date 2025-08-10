const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
   let token = req.headers?.authorization?.split(' ')[1]
   if(token){
      let decoded = jwt.verify(token,process.env.JWT_SECRET)
      if(decoded){
        req.user = decoded.userId
        next()
      }else{
         res.status(400).json({message:"Please try again"})
      }
   }else{
      res.status(400).json({message:"Unauthorized access"})
   }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
module.exports = authMiddleware;
