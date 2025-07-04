const mongoose=require('mongoose')


// create schema
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    isMarried:Boolean,
    location:String
})

// create model

const UserModel=mongoose.model('users',userSchema)

module.exports=UserModel