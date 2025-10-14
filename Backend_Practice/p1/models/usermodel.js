const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    location:String,
    isMarried:Boolean
})

const UserModel = mongoose.model("users",userSchema)

module.exports = UserModel
