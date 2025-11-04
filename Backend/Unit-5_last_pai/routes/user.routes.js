const express=require("express")
const UserRouter=express.Router()
const bcrypt = require('bcrypt');
const UserModel = require("../models/usermodel");
const saltRounds = 10;
var jwt = require('jsonwebtoken')
//sign up route

UserRouter.post("/signup",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                res.status(500).json({message:"something went wrong"})
            }
            else{
             UserModel.create({username,email,password:hash})
            }
})
    }catch(err){
        console.log(err)

    }
})

// login Route
UserRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        else{
            let hash = user.password
            bcrypt.compare(password, hash).then(function(result) {
                if(result==true){
                 var token = jwt.sign({ userId: user._id }, 'shhhhh');
                }

})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports=UserRouter