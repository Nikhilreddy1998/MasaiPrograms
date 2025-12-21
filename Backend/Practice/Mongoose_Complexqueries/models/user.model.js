const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,default:"pass123"},
    age:{type:Number,min:20,max:60},
    gender:{type:String,enum:["male","female"]},
    address:[{//nested document
        houseNumber:{type:String,required:true},
        area:{type:String,required:true},
        landmark:{type:String,required:true},
        district:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:Number,required:true}

    }]
})


const UserModel = mongoose.model("users",userSchema)

module.exports=UserModel

