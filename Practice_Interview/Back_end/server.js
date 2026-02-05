const express=require("express")
const connectToDb=require("./configs/mongodb.config")
const UserRouter=require("./routes/user.routes")
const app=express()

connectToDb()
app.use(express.json())
app.use('/users',UserRouter)

app.get("/test", (req, res) => {
    res.send("Server working");
});


app.listen(3000,()=>{
    console.log("server started running")
})