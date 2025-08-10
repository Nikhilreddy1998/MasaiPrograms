const express = require('express')
const MovieModel = require('../models/movie.model')
const movieRouter = express.Router()

movieRouter.post('/add-movie',async(req,res)=>{
    try {
        let movie = await MovieModel.create(req.body)
        res.status(201).json({message:"Movie added",result:movie})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",message:error.message})
    }
})

module.exports = movieRouter