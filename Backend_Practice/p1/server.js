const express=require ("express")
const connectToDb = require("./configs/configs.db")
const userRoute = require("./routes/user.route")

const app = express()

app.use(express.json())

connectToDb()

app.use('/users',userRoute)

app.listen(3000,()=>{
    console.log("server started running")
})