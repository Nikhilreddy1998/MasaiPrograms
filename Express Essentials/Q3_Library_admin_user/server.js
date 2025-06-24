const express = require('express')
const adminRouter = require('./routes/admin.routes')
const readerRouter = require('./routes/reader.routes')
const {loggerMiddleware} = require('./middlewares/loggerMiddleware')
const app = express()

app.use(express.json())
app.use(loggerMiddleware)

// Admin routes
app.use("/admin",adminRouter)

// Reader routes
app.use("/reader",readerRouter)

app.use((req,res)=>res.status(404).json({error:"404 Not found"}))
app.listen(3000,()=>console.log("Server started at https://localhost:3000"))
