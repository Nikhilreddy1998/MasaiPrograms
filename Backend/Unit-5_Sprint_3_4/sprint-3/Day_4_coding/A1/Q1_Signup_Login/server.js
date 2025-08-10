const express = require('express')
const connectTODB = require('./config/db')
const userRouter = require('./routes/user.route')
const app = express()
const PORT = process.env.PORT || 3000
// body parser
app.use(express.json())

// connect to DB
connectTODB()

// user router
app.use('/users',userRouter)

// Undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// port
app.listen(PORT,()=>console.log("Server started"))
