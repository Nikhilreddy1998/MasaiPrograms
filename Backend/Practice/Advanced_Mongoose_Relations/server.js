const express= require("express")
const connectToDb = require("./configs/mongo.db")
const userRouter = require("./routes/user.routes")

const app = express()

app.use(express.json())

connectToDb()

app.use("/users",userRouter)

app.listen(3000,()=>{
    console.log("server started running")
})