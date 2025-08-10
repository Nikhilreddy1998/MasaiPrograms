const express = require('express')
const {  loginRoute, signupRoute } = require('../controllers/user.controller')
const userRouter = express.Router()

// signup
userRouter.post('/signup',signupRoute)

// login
userRouter.post('/login',loginRoute)

module.exports = userRouter