const express = require('express')
const connectTODB = require('./config/db')
const userRouter = require('./routes/user.route')
const blogRouter = require('./routes/blog.route')
const app = express()
const PORT = process.env.PORT || 3000
// body parser
app.use(express.json())

// connect to DB
connectTODB()

// User Router
app.use('/users',userRouter)

// Note Router
app.use('/blogs',blogRouter)

// Undefined routes
app.use((req,res)=>res.status(404).json({error:"404 Not Found"}))

// port
app.listen(PORT,()=>console.log("Server started"))
