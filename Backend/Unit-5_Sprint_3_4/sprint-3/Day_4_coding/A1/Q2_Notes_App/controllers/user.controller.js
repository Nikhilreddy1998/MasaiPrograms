const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// signup
const signupRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "this email is already exists in system" });
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Something went wrong", message: error.message });
      } else {
        let user = await UserModel.create({ name, email, password: hash });
        res.status(201).json({ message: "User created", details: user });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

// login
const loginRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let hash = user.password;
    bcrypt.compare(password, hash, async (err, result) => {
      if (result == true) {
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(404).json({ message: "Wrong password", error: err });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

module.exports = {
  signupRoute,
  loginRoute,
};
