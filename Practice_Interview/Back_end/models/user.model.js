const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,min:20,max:40},
    password:{type:String,default:"pass123"},
    location:String,
    isMarried:Boolean
})

const UserModel=mongoose.model('Users',userSchema)
module.exports=UserModel