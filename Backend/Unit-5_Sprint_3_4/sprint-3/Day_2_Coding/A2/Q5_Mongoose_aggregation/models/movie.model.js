const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  _id: {type:String,required:true}, // "M1"
  title: {type:String,required:true},
  genre: {type:String},
  releaseYear: Number,
  durationMins: Number,
});


const MovieModel = mongoose.model("Movie",movieSchema)

module.exports = MovieModel
