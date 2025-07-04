const mongoose = require('mongoose')

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    year:Number,
    genre:String,
    available:Boolean
})

const BookModel=mongoose.model("books",bookSchema)

module.exports=BookModel