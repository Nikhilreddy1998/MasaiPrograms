const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { signupRoute, loginRoute, privateRoute } = require('../controllers/user.controller')
const userRouter = express.Router()

// Signup
userRouter.post('/signup',signupRoute)

// Login
userRouter.post('/login',loginRoute)

// Private Route
userRouter.get('/protected',authMiddleware,privateRoute)

module.exports = userRouter