const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileId:Number
});

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel
