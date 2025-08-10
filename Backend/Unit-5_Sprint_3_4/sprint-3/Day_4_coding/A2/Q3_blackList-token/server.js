const express = require('express')
const connectTODB = require('./config/db')
const userRouter = require('./routes/user.route')
const bookingRouter = require('./routes/booking.route')

const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000

// Connect to DB
connectTODB()

// Body parser
app.use(express.json())

// User Router
app.use('/users',userRouter)

// Service Router
app.use('/bookings',bookingRouter)

// undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// create localhost connection 
app.listen(PORT,()=>console.log("Server started at https://localhost:3000"))
