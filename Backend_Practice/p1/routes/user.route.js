const express=require("express")
const UserModel = require("../models/usermodel")

const userRoute=express.Router()

userRoute.post('/add-user', async (req, res) => {
  try {
    let user = await UserModel.create(req.body);
    res.json({ msg: "user added", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding user", error: err.message });
  }
});




module.exports = userRoute
