const express= require('express')
const BookModel = require('../models/book.model')


const BookRouter=express.Router()

BookRouter.get('/', async(req,res)=>{
    try{
        let books=await BookModel.find({})
        res.status(200).json({msg:"Booklist",books})
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
})


BookRouter.post("/add-book",async(req,res)=>{
    let book = await BookModel.create(req.body)
    res.status(200).json({msg:"book added",book})
})

BookRouter.patch("/update-book/:bookId",async(req,res)=>{
    const {bookId}=req.params

    let book = await BookModel.findById(bookId)

    if(!book){
        res.status(404).json({msg:"Book not found"})
    }
    else{
        await BookModel.findByIdAndUpdate(bookId,req.body)
        res.status(200).json({msg:"Bookupdated"})
    }
})
BookRouter.delete("/delete-book/:bookId",async(req,res)=>{
    const {bookId}=req.params

    let book = await BookModel.findById(bookId)

    if(!book){
        res.status(404).json({msg:"Book not found"})
    }
    else{
        await BookModel.findByIdAndDelete(bookId)
        res.status(200).json({msg:"Bookdeleted"})
    }
})


module.exports = BookRouter