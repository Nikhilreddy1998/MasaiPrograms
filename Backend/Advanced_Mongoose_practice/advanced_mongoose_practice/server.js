const express=require("express")
const connectToDb = require("./configs/mongodb.config")
const UserRouter = require("./routes/user.routes")
// step 1: basic express setup
// step 2: connecting mongodb with nodejs
// step 3: Creating Schema and model
// step 4: Create routes or controllers and test with postman
const app=express()

connectToDb()

app.use(express.json())

// userRoutes
app.use('/users',UserRouter)

// handling undefined routes

app.use((req,res)=>{
    res.status(404).json({msg:"request not found "})
})

app.listen(3000,()=>{
    console.log("server started running")
})