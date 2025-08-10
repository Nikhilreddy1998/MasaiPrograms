const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  _id: {type:String,required:true}, //B1
  userId: {type:String,required:true},
  movieId: {type:String,required:true},
  bookingDate: {type:Date,default:Date.now},
  seats: {type:Number,required:true},
  status: {type:String,enum:["Booked","Cancelled"],required:true}
});


const BookingModel = mongoose.model("Booking",bookingSchema)

module.exports = BookingModel
