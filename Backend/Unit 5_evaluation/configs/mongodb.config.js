const mongoose =require ("mongoose")

const connectTODB =async()=>{
    try{
        await mongoose.connect("https://www.mongodb.com/try/download/shell")
        console.log("connected to DB")
    }catch(err){
        conswole.log("connection failed", err)
    }

    }
module.exports = connectTODB