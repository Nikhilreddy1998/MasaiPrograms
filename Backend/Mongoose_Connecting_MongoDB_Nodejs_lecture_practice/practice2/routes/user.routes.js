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

module.exports= UserRouter;