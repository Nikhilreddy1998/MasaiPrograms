const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

// signup route
const signupRoute = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        let checkUser = await UserModel.findOne({email})
        if(checkUser) return res.status(400).json({message:"This email is already exists in the system"})
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err) return res.status(500).json({error:"Something went wrong",err})
            let user = await UserModel.create({name,email,password:hash})
            res.status(201).json({message:"User signup successfull",user})
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
        if(!checkUser) return res.status(404).json({message:"User not found, signup first"})
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

module.exports = {
    signupRoute,
    loginRoute
}
