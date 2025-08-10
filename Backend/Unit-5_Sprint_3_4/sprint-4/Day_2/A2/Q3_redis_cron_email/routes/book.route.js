const express = require('express')
const authMiddleware = require('../middleware/auth.midlleware')
const cron = require('node-cron')
const { getBooks, addBook, updatedBook, deleteBook, bulkCreate } = require('../controllers/book.controller')
const { reportCron, createBook } = require('../controllers/cron.controller')
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

// Create new books cron 
cron.schedule("*/1 * * * * *",createBook)

// Report cron
cron.schedule("*/5 * * * *",reportCron)

module.exports = bookRouter