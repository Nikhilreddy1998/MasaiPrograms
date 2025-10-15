const express=require("express")
const BookModel = require("../models/book.model")

const bookRoute=express.Router()

bookRoute.post('/add-book',async (req,res)=>{
    try{
        let book= await BookModel.create(req.body)
        res.json({msg:"book added",book})
    }catch(err){
        console.log(err)
        res.status(404).json({msg:"Error adding book"})
    }
})

module.exports=bookRoute



bookRoute.get("/get-books:bookid",async(req,res)=>{
    try {
        const {bookid}=req.params
        let book = await BookModel.findById(bookid)
        res.json({msg:"book found",book})
    }
    catch(err){
      res.json({msg:"error finding book" })
    }
})



bookRoute.delete("/delete-books:bookid",async(req,res)=>{
    try {
        const {bookid}=req.params
        let book = await BookModel.findByIdAndDelete(bookid)
    }
    catch(err){
      res.json({msg:"error finding book" })
    }
})










