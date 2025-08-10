const express = require('express')
const { userSignup, userLogin, userLogout } = require('../controllers/user.controller')
const userRouter = express.Router()
require('dotenv').config()

// Signup route
userRouter.post('/signup',userSignup)

// Login route
userRouter.post('/login',userLogin)

// Logout 
userRouter.post('/logout',userLogout)

module.exports = userRouter