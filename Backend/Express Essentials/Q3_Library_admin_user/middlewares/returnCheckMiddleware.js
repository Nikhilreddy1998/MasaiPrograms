const { getAvailableBooks } = require("../modules/reader.modules")

const returnCheckMiddleware = (req,res,next)=>{
    const id = parseInt(req.params.id)
    const data = getAvailableBooks().data
    const books = data.books
    const index = books.findIndex(book=>book.id==id)
    if(index==-1)
       return res.status(404).json({message:"Book not found to return"})
    if(books[index].status=="available")
      return   res.status(400).json({message:"This book has not borrowed"})
    if(isMoreThanThreeDays(books[index].borrowedDate))
       return  res.status(400).json({ "error": "Book cannot be returned within 3 days of borrowing." })
    next()
}

function isMoreThanThreeDays(borrowDate){
    borrowDate = new Date(borrowDate)
    returnDate = Date.now()
    const diffMS = Math.abs(borrowDate-returnDate)
    const diffDays = diffMS/(1000*60*60*24)
    return diffDays<=3
}

module.exports= returnCheckMiddleware