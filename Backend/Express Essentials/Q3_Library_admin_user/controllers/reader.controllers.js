const { getAvailableBooks, getDate, borrowORreturn, isMoreThanThreeDays } = require('../modules/reader.modules')

// Read Avaiable books
const getAvlBoooks = (req,res)=>{
    const books = getAvailableBooks().avlBooks
    if(books.length == 0)
        return res.status(404).json({message:"Books not available"})
    res.status(200).json({message:"List of available books",totalBooks:books.length,result:books})
}

// Borrow Book
const borrowedBook = (req,res)=>{
    const name = req.body.readerName
    const id = parseInt(req.params.id)
    const data = getAvailableBooks().data
    const books = data.books
    const index = books.findIndex(book=>book.id==id)
    const borrowedDate = getDate()
    books[index] = {...books[index],status:"borrowed",borrowedBy:name,borrowedDate}
    borrowORreturn(data)
    res.status(201).json({message:"Book has been borrowed",result:books[index]})
}

// Return a Book
const returnBook = (req,res)=>{
    const id = parseInt(req.params.id)
    const data = getAvailableBooks().data
    const books = data.books
    const index = books.findIndex(book=>book.id==id)
    books[index] = {...books[index],status:"available",borrowedBy:'',borrowedDate:''}
    borrowORreturn(data)
    res.status(201).json({message:"Book has been return",result:books[index]})
}

module.exports = {
    getAvlBoooks,
    borrowedBook,
    returnBook
}