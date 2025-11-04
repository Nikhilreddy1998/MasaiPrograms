const mongoose= require("mongoose")

const connectToDb=async()=>{
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/vehicle")
    console.log("connect TO Db")
}catch(err){
    console.log("Err in connecting DB")
    console.log(err)
}
}

module.exports=connectToDb