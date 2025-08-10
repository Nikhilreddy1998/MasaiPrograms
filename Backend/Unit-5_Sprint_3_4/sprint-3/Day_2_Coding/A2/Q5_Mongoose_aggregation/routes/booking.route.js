const express = require('express')
const BookingModel = require('../models/booking.model')
const bookingRouter = express.Router()

bookingRouter.post('/add-booking',async(req,res)=>{
    try {
        let booking = await BookingModel.create(req.body)
        res.status(201).json({message:"Booking has been done",result:booking})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",message:error.message})
    }
})

module.exports = bookingRouter