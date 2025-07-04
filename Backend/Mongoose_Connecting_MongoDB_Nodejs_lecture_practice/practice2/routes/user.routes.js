const express = require('express')
const UserModel = require('../models/user.model')

const UserRouter=express.Router()

console.log("HI")

UserRouter.get('/', async (req,res)=>{
    try{
    let users= await UserModel.find({})

    res.status(200).json({msg:"userlist",users})
    }catch(err){
        res.status(500).json({msg:"something went wrong"})
    }
})


UserRouter.post("/add-user",async (req,res)=>{
    console.log(req.body)
    let user=await UserModel.create(req.body)
    res.status(200).json({msg:"user added",user})
})

UserRouter.patch("/update-user/:userId",async (req,res)=>{
    const {userId}=req.params

    let user=await UserModel.findById(userId)

    if(!user){
        res.status(404).json({msg:"UserNotfounf"})
    }
    else{
        await UserModel.findByIdAndUpdate(userId,req.body)
        res.status(200).json({msg:"Userupdated"})
    }
})

UserRouter.delete('/delete-user/:userId',async(req,res)=>{
    const {userId}=req.params

    let user =await UserModel.findById(userId)

    if(!user){
        res.status(404).json({msg:"User Not found"})
    }
    else{
        await UserModel.findByIdAndDelete(userId)
        res.status(200).json({msg:"User Deleted"})
    }
})

module.exports= UserRouter;