const express = require('express')
const UserModel = require('../models/user.model')
const userRouter = express.Router()

userRouter.post('/add-user',async(req,res)=>{
    try {
        let user = await UserModel.create(req.body)
        res.status(201).json({message:"User added",result:user})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",message:error.message})
    }
})


module.exports = userRouter