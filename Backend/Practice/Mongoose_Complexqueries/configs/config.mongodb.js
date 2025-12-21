const mongoose = require("mongoose")

const connectTODB=async ()=>{
    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/practice")
    console.log("connected to DB")
    }catch(err){
        console.log(err)
    }

}

module.exports = connectTODB