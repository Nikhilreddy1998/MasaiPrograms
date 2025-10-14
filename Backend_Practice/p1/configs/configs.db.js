const mongoose = require("mongoose")

const connectToDb=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/newpractice')
        console.log("connected to Db")
    }catch(err){
        console.log(err)
    }
}

module.exports=connectToDb