const mongoose = require("mongoose")

const connectToDb= async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/librarymanagement")

    console.log("connected to Db")
}

module.exports=connectToDb