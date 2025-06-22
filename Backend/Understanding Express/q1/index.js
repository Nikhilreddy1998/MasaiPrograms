const express=require('express')
const app =express()

// HTML text using res.send
app.get('/htmltext',(req,res)=>{
    res.send(`<h1>Welcome to Express</h1>`)
})
//json using res.json
app.get('/json',(req,res)=>{
    res.json({msg:"This is json"})
})

//undefined routes
app.get('')




app.listen(3000,()=>{
    console.log("server running")
})