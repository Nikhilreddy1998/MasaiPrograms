const express = require("express")
const app=express()

app.listen(3000,(req,res)=>{
    console.log("server started running")
})

app.get('/home',(req,res)=>{
    res.send("This is home route")
})