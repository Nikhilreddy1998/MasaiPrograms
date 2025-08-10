const express = require('express')
const { signupRoute, loginRoute} = require('../controllers/user.controller')
const userRouter = express.Router()

// Singup route
userRouter.post('/signup',signupRoute)

// Login route
userRouter.post('/login',loginRoute)


module.exports = userRouter