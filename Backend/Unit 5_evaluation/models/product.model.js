const mongoose = require('mongoose')
 const productSchema=new mongoose.Schema({
    title:String,
    type:String,
    cost : Number,
    available : Boolean
 })


 const ProductModel = mongoose.model("products",productSchema)

 module.exports = ProductModel