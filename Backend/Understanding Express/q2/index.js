const express=require('express')
const app=express()

app.get('users/data',(req,res)=>{
   data=req.body
   res.json(data)
})



app.listen(3000,()=>{
    console.log("Server running")
})