const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    isMarried:{type:Boolean,enum:["yes","No"]},
    Gender:{type:String,enum:["male","female"]}
})


const UserModel= mongoose.model('users',userSchema)


module.exports = UserModel