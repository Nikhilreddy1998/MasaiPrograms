const mongoose = require("mongoose")

const connectToDb= async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/presentdb")
        console.log("connected to Db")
    }catch(err){
        console.log("error",err)
    }
}

module.exports = connectToDb