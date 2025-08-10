const express = require('express')
const { signupRoute, loginRoute } = require('../controllers/user.controller')
const userRouter = express.Router()

// signup
userRouter.post('/signup',signupRoute)

// login
userRouter.post('/login',loginRoute)

module.exports = userRouter