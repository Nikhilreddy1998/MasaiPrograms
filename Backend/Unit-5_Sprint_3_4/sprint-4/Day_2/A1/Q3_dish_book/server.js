const express = require('express')
const connecToDB = require('./config/db')
const authRouter = require('./routes/auth.route')
const dishRouter = require('./routes/dish.route')
const orderRouter = require('./routes/order.route')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT 

// body parser
app.use(express.json())

// connect to DB
connecToDB()

// Auth Router
app.use('/auth',authRouter)

// Dish Router
app.use("/dishes", dishRouter)

// Order Router
app.use("/orders", orderRouter)

// undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// listen port
app.listen(PORT,()=>console.log("Server started at port 3000"))