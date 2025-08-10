const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const UserModel = require('../models/user.model')
const TokenModel = require('../models/blacklistToken.model')

// Singup route
const singupRoute = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        let checkUser = await UserModel.findOne({email})
        if(checkUser) return res.status(400).json({message:"This email is already exists in the system"})
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err) return res.status(500).json({error:"Something went wrong",err})
            let user = await UserModel.create({name,email,password:hash})
            res.status(201).json({message:"User singup successfull",user})
        })
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
}

// Login route
const loginRoute = async(req,res)=>{
    try {
        const {email,password} = req.body
        let checkUser = await UserModel.findOne({email})
        if(!checkUser) return res.status(404).json({message:"User not found, Singup first"})
        let hash = checkUser.password
        bcrypt.compare(password,hash,async(err,result)=>{
           if(result==true){
               let token = jwt.sign({userId:checkUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"15m"})
               res.status(200).json({message:"Login sucessful",token})
            }
            else{
                res.status(403).json({message:"Incorrect password"})
            }
        })
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
}

// transport 
let transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.GOOGLE_APP_EMAIL,
        pass:process.env.GOOGLE_APP_PASSWORD
    }
})

// Forget Route
const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body
        let user = await UserModel.findOne({email})
        if(!user) return res.status(404).json({message:"User not found"})
        let resetToken = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"20m"})
        let resetPasswordLink = `http://localhost:3000/users/reset-password/${resetToken}`
        let info = transport.sendMail({
            from:"Yash Molawade",
            to:user.email,
            subject:"Password reset Link",
            html:`<p>Dear ${user.name}, here is your password reset link, please finish this process within 20 minutes </p>
                    <h4>${resetPasswordLink}</h4>`
        })
        res.status(200).json({message:"Password reset link send to registered email",info:(await info).messageId})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error})
    }
}

// Reset route
const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params
        const {newPassword} = req.body
        let isTokenValid = await TokenModel.findOne({token})
        if(isTokenValid) return res.status(403).json({message:"This token is blacklisted"})
        let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(decoded){
            let user = await UserModel.findById(decoded.userId)
            bcrypt.hash(newPassword,10,async(err,hash)=>{
                if(err) return res.status(500).json({error:"Something went wrong"})
                user.password = hash
                await user.save()
                await TokenModel.create({token})
                res.status(201).json({message:"password change successfully"})
            })
        }else{
            res.status(404).json({message:"Invalid token please check"})
        }

    } catch (error) {
        if(error.message=='jwt expired'){
            res.status(403).json({message:"Password reset link has been expired, please click forgot password again to reset the password"})
        }else {
            res.status(500).json({error:"Something went wrong",error})
        }

    }
}

module.exports = {
    singupRoute,
    loginRoute,
    forgotPassword,
    resetPassword
}
