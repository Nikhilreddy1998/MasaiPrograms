// step1: create basic express setup
// step2 : coonect MongoDB with Nodejs through Mongoose
// step3 : we need to create a schema and model
// step4: Import model and create route and perform CRUD

const express = require('express')
const connectTODB = require('./configs/mongodb.config')
const UserRouter = require('./routes/user.routes')

const app =express()
connectTODB()

app.use(express.json())


app.use("/users",UserRouter)

app.get("/api",(req,res)=>{
    res.send("Worldddd");
})






    app.listen(7777,()=>{
    console.log("server started")
    })


