const express = require("express")
const connectToDb = require("./configs/configs.db")
const bookRoute = require("./routes/bookroute")
const app = express()

app.use(express.json())



connectToDb()

app.use('/books',bookRoute)

app.listen(3000,()=>{
    console.log("server started running")
})