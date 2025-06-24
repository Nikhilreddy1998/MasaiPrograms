const express = require('express')
const { addNewBook, getAllBooks,deleteBookById, patchBookById } = require('../controllers/admin.controllers')
const adminRouter = express.Router()

adminRouter.post('/books',addNewBook)
adminRouter.get('/books',getAllBooks)
adminRouter.patch('/books/:id',patchBookById)
adminRouter.delete('/books/:id',deleteBookById)

module.exports = adminRouter