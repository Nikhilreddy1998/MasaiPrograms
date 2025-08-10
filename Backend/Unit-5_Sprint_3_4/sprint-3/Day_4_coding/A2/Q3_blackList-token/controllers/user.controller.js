const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Singup
const userSignup = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body
        let user = await UserModel.findOne({email})
        if(user) return res.status(400).json({message:"User email is already exists"})
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                res.status(500).json({Error:"Something went wrong",message:err.message})
            }else{
                let user = await UserModel.create({name,email,password:hash,role})
                res.status(201).json({message:"Signup successfull",details:user})
            }
        })
    } catch (err) {
        res.status(500).json({Error:"Something went wrong",message:err.message})
    }
}

// Login
const userLogin  = async(req,res)=>{
    try {
        const {email,password} = req.body
        let user = await UserModel.findOne({email})
        if(!user) return res.status(404).json({message:"This email is not exists in the system signup first"})
        let hash = user.password
        bcrypt.compare(password,hash,async(err,result)=>{
            if(result==true){
                var accessToken = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "15m" });
                var refreshToken = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "7 days" });
                res.status(200).json({message:"Login successfull",accessToken,refreshToken})
            }else{
                res.status(403).json({message:"Wrong password try again"})
            }
        })
    } catch (err) {
        res.status(500).json({Error:"Something went wrong",message:err.message})
    }
}

// Logout
const userLogout = async (req, res) => {
  try {
    const accessToken = req.headers?.authorization?.split(" ")[1];
    const refreshToken = req.headers?.refreshtoken?.split(" ")[1];
    if (!accessToken || !refreshToken) {
      return res.status(400).json({ message: "Both access and refresh tokens are required in headers" });
    }
    await BlacklistModel.insertMany([
      { token: accessToken },
      { token: refreshToken }
    ]);
    return res.status(200).json({ message: "Logged out successfully. Tokens blacklisted." });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};


module.exports = {
    userSignup,
    userLogin,
    userLogout
}