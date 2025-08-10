const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    author:{type:String,required:true},
    title:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

const BookModel = mongoose.model('Book',bookSchema)

module.exports = BookModel