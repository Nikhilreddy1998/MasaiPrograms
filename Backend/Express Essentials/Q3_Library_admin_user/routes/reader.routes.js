const express = require('express')
const { getAvlBoooks, borrowedBook, returnBook } = require('../controllers/reader.controllers')
const returnCheckMiddleware = require('../middlewares/returnCheckMiddleware')
const transactionLogger = require('../middlewares/transactionLogger')
const readerRouter = express.Router()

readerRouter.get('/books',getAvlBoooks)
readerRouter.post('/borrow/:id',transactionLogger,borrowedBook)
readerRouter.post('/return/:id',returnCheckMiddleware,transactionLogger,returnBook)

module.exports = readerRouter