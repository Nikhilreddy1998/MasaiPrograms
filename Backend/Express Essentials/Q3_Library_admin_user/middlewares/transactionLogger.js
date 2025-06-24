const { getAvailableBooks } = require("../modules/reader.modules")
const { getFulldate } = require("./loggerMiddleware")

const fs = require('fs')

const transactionLogger = (req,res,next) =>{
    const fullDate = getFulldate()
    const name = req.body.readerName
    const id = parseInt(req.params.id)
    const data  = getAvailableBooks().data
    const books = data.books 
    const index = books.findIndex(book=>book.id==id)
     if(index==-1)
      return  res.status(404).json({message:`Book not found with id ${id}`})
    if(books[index].status=='borrowed'){
        return res.status(400).json({message:`Book already borrowed`})
    }
    const bookTitle = books[index].title
    const logMsg = `${fullDate} ${name} borrowed ${bookTitle}` 
    fs.appendFileSync('./server.log',logMsg)
    next()
}

module.exports = transactionLogger