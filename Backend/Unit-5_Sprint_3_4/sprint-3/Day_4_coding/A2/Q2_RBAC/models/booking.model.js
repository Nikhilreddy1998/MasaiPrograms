const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    type:{type:String,required:true},
    date:{type:Date,default:Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status:{type:String,default:"pending",enum:['pending','approved','cancelled','rejected']}
})

const BookingModel = mongoose.model("Booking",bookingSchema)

module.exports = BookingModel