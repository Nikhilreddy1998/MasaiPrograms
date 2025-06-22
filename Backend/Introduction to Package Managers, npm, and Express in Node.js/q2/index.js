const express = require('express')
const app =express()
const port =3000


app.get("/home",(req,res)=>{
   res.send("THIS IS HOME PAGE")
})
app.get('/contactus',(req,res)=>{
   res.send("contact us at nikhilreddy125@gmail.com")
})
app.get('/about',(req,res)=>{
res.send("Welcome to About page")
})
app.listen(port, ()=>{
console.log('server started on the port')
})