const express=require("express")
const UserModel = require("../models/user.model")

const userRouter=express.Router()

userRouter.post("/add-user",async(req,res)=>{
    try{
        let user = await UserModel.create(req.body)
        res.status(200).json({msg:"user-added",user})
    }catch(err){
        res.status(404).json({msg:"something went wrong"})
    }
})

module.exports = userRouter
