const express=require('express')
const app=express()
app.use(express.json())

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 5, 
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
})

app.use(limiter)

app.listen(3000,()=>{
    console.log("server started")
})

app.get('/info',(req,res)=>{
res.json({msg:'this is info'})
})