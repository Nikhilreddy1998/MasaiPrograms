const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"user",enum:['user','admin','chef']}
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel