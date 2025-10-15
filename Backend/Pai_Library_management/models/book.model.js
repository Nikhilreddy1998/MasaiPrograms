const mongoose=require("mongoose")

const bookSchema= new mongoose.Schema({
title: String,
summary: String,
publishedDate: Number,
copiesAvailable: Number

})

const BookModel=mongoose.model("books",bookSchema)

module.exports=BookModel