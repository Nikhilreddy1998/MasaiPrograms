const BookModel = require('../models/book.model')
const UserModel = require('../models/user.model')
const Redis = require('ioredis')
const redis = new Redis()

// Get books
exports.getBooks = async(req,res)=>{
    try {
        let user = await UserModel.findById(req.user)
        if(!user) return res.status(404).json({message:'User not found'})
        let cache = await redis.get(user.name) 
        if(cache) return res.status(200).json({message:`book list of ${user.name} from redis`,books:JSON.parse(cache)})
        let books = await BookModel.find({userId:req.user})
        if(books.length==0) return res.status(404).json({message:'Books list is empty'})
        await redis.set(user.name,JSON.stringify(books),"EX",60)
        res.status(200).json({name:user.name,listOfBooks:books})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error:error.message})
    }
}

// Add new Book
exports.addBook = async(req,res)=>{
    try {
        let user = await UserModel.findById(req.user)
        if(!user) return res.status(404).json({message:'User not found'})
        let book = await BookModel.create({...req.body,userId:req.user})
        await redis.del(user.name)
        res.status(201).json({message:"new book added",book})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error:error.message})
    }
}

// update a book
exports.updatedBook = async(req,res)=>{
    try {
        const bookId = req.params.id
        let user = await UserModel.findById(req.user)
        if(!user) return res.status(404).json({message:'User not found'})
        let updatedBook = await BookModel.findByIdAndUpdate(bookId,req.body,{new:true})
        if(!updatedBook) return res.status(404).json({message:"Book not found to update"})
        await redis.del(user.name)
        res.status(200).json({message:"Book get updated",updatedBook})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error:error.message})
    }
}

// Delete a book
exports.deleteBook = async(req,res)=>{
    try {
        const bookId = req.params.id
        let user = await UserModel.findById(req.user)
        if(!user) return res.status(404).json({message:'User not found'})
        let deletedBook = await BookModel.findByIdAndDelete(bookId)
        if(!deletedBook) return res.status(404).json({message:"Book not found to Delete"})
        await redis.del(user.name)
        res.status(200).json({message:"Book get Deleted",deletedBook})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error:error.message})
    }
}

// Bulk books data (array)
exports.bulkCreate = async(req,res)=>{
    try {
        let books = req.body
        books.push(req.user)
        await redis.set('bulkBooks',JSON.stringify(books))
        res.status(200).json({message:"Book will added later"})
    } catch (error) {
        res.status(500).json({error:"Something went wrong",error:error.message})
    }
}