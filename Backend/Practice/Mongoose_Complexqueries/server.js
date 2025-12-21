const express=require("express")
const connectTODB = require("./configs/config.mongodb")
const userRout = require("./routes/user.routes")
//step 1 : basic express setup
//step 2 : connecting mongodb with nodejs
//step 3 : creating schema and model

const app=express()

app.use(express.json())

connectTODB()

app.use("/users",userRout)

app.get('/test',(req,res)=>{
    res.json({msg:"this is test route"})
})

app.listen(3000,()=>{
    console.log("server started running")
})