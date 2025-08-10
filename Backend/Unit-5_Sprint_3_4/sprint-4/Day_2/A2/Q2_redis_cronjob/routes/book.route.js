const express = require('express')
const authMiddleware = require('../middleware/auth.midlleware')
const BookModel = require('../models/book.model')
const UserModel = require('../models/user.model')
const cron = require('node-cron')
const Redis = require('ioredis')
const { getBooks, addBook, updatedBook, deleteBook, bulkCreate } = require('../controllers/book.controller')
const redis = new Redis()
const bookRouter = express.Router()

// Get books
bookRouter.get('/',authMiddleware,getBooks)

// Add new Book
bookRouter.post('/',authMiddleware,addBook)

// update a book
bookRouter.put('/:id',authMiddleware,updatedBook)

// Delete a book
bookRouter.delete('/:id',authMiddleware,deleteBook)

// Bulk books data (array)
bookRouter.post('/bulk',authMiddleware,bulkCreate)

cron.schedule("*/2 * * * *",async()=>{
        let books = await redis.get('bulkBooks')
        if(books){
            books = JSON.parse(books)
            let userId = books.pop()
            let passedBook = 0
            let failedBook = 0
            for(let book of books){
                try {
                    await BookModel.create({...book,userId})
                    passedBook++
                } catch (error) {
                    failedBook++
                }
            }
            let report = `Bulk books update report:
            Task initiated by : ${userId}    
            passed books are : ${passedBook}
            failed books are : ${failedBook}
            `
            console.log(report)
            await redis.del('bulkBooks')
        }else {
            console.log("No Books Found To Update in Bulk");
        }
   
})
module.exports = bookRouter