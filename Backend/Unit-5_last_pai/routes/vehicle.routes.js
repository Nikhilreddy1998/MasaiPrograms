const express=require("express")
const VehicleModel = require("../models/vehiclemodel")
const authMiddleware = require("../middlewares/auth,middleware")

const VehicleRouter=express.Router()

VehicleRouter.post('/buyvehicle',authMiddleware,async (req,res)=>{
    let vehicle = await VehicleModel.create({req.body})
})

module.exports=VehicleRouter