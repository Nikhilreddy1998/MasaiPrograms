const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const GitHubStrategy = require("passport-github2")
const UserModel = require('../models/user.model')
require('dotenv').config()

// Test Route 
userRouter.get('/test',(req,res)=>{
    try {
        res.status(200).json({message:"This is TEST route"})
    } catch (error) {
        res.status(500).json({error:"Something went wrong"})
    }
})

// Github OAuth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log("Github profile",profile)
    return done(null,profile)
  }
));

// Calls github Login/authorization page
userRouter.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Callback route login success or failure
userRouter.get('/auth/github/callback', 
  passport.authenticate('github', { session:false, failureRedirect: '/login' }),
  async function(req, res) {
   const githubUserId = req.user.id
    const user = await UserModel.find({profileId:githubUserId})
    if(user.length==0){
      let newUser = await UserModel.create({profileId:githubUserId})
      var token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET);
      res.status(200).json({msg:"Login success",token})
    }
   else{
    var token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
    res.status(200).json({msg:"Login success",token})
   }
  });

module.exports = userRouter

 