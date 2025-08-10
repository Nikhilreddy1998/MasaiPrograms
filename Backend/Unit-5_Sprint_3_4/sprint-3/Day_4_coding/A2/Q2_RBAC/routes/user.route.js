const express = require('express')
const { userSignup, userLogin } = require('../controllers/user.controller')
const userRouter = express.Router()
require('dotenv').config()

// Signup route
userRouter.post('/signup',userSignup)

// Login route
userRouter.post('/login',userLogin)

module.exports = userRouter