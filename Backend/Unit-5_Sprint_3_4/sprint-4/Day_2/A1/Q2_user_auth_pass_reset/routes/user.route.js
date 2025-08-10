const express = require('express')
const limiter = require('../middlewares/rate.middleware')
const { singupRoute, loginRoute, forgotPassword, resetPassword } = require('../controllers/user.controller')
const userRouter = express.Router()

// Singup route
userRouter.post('/singup',singupRoute)

// Login route
userRouter.post('/login',limiter,loginRoute)

// Forget Route
userRouter.post("/forgot-password",limiter,forgotPassword)

// Reset route
userRouter.post('/reset-password/:token',resetPassword)

module.exports = userRouter