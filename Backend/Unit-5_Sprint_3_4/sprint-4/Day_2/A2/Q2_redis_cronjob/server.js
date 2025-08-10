const express = require('express')
const connecToDB = require('./config/db')
const userRouter = require('./routes/user.route')
const bookRouter = require('./routes/book.route')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000

// body parser
app.use(express.json())

// connect to DB
connecToDB()

// User Router
app.use('/users',userRouter) 
// Book Router 
app.use('/books',bookRouter)

// undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// listen port
app.listen(PORT,()=>console.log("Server started at port 3000"))