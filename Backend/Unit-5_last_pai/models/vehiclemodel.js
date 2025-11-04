const mongoose=require("mongoose")
const vehicleSchema= new mongoose.Schema({
    vehicletype:String,
    ispurchased:Boolean
})

const VehicleModel=mongoose.model("vehicles",vehicleSchema)

module.exports=VehicleModel