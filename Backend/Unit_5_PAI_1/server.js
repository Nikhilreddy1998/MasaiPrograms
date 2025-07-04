const express=require('express')
const BookRouter = require('./routes/book.routes')
const connectTODB = require('./configs/mongodb.config')

const app=express()
connectTODB()
app.use(express.json())

app.use("/books",BookRouter)

app.listen(7777,()=>{
    console.log("Server started")
})