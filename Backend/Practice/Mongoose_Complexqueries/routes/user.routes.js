const express=require("express")
const UserModel = require("../models/user.model")

const userRout=express.Router()


userRout.post('/add-user',async (req,res)=>{
    try{
    let user=await UserModel.create(req.body)
    res.status(200).json({msg:"user added",user})
    }catch(err){
        res.status(500).json({msg:"Internal server error"})
        console.log(err)
    }
})

userRout.patch('/add-address/:userid',async (req,res)=>{

    const {userid} = req.params

    try{
        const user = await UserModel.findById(userid)
        if(!userid){
            res.status(404).json({msg:"user not found"})
        }
        else{
            console.log(user.address)
            user.address.push(req.body)
            await user.save()
           res.status(200).json({msg:"address added"})
        }
    }catch(err){
           console.log(err)
    }
    

})


module.exports = userRout