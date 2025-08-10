const express = require('express')
const connectToDB = require('./config/db')
const lmsRouter = require('./routes/lms.routes')
const app = express()
const PORT = process.env.PORT || 3000

//  Body parser
app.use(express.json())

// DB connection
connectToDB()

// User Route
app.use('/lms',lmsRouter)

// Undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

app.listen(PORT,()=>console.log("Server started at port 3000"))