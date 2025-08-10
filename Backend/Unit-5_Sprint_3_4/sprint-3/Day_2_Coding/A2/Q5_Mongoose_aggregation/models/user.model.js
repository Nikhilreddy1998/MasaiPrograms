const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: {type:String,required:true}, // "U1"
  name: {type:String,required:true},
  email: {type:String,required:true,unique:true},
  joinedAt: {type:Date,default:Date.now},
});


const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel
