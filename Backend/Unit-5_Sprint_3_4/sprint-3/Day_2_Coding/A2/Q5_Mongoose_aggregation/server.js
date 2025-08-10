const express = require('express')
const connectToDB = require('./config/db')
const movieRouter = require('./routes/movie.route')
const userRouter = require('./routes/user.route')
const bookingRouter = require('./routes/booking.route')
const analysisRouter = require('./routes/analytics.route')
const app = express()
const PORT = process.env.PORT || 3000

// Body parser
app.use(express.json())

// DB Connection
connectToDB()

// Movie Router
app.use('/movies',movieRouter)

// User Router
app.use('/users',userRouter) 

// Booking Router
app.use('/bookings',bookingRouter)

// Analytics Router 
app.use('/analytics',analysisRouter)

// Undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// port 
app.listen(PORT,()=>console.log("Server started"))