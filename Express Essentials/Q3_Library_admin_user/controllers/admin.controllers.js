const { getData, addOrUpdate } = require('../modules/admin.modules')


const addNewBook = (req,res)=>{
    let newBook = req.body
    const data = getData()
    const books = data.books 
    const id = books.length>0?books[books.length-1].id+1 : 1
    newBook = {id,...newBook}
    books.push(newBook)
    addOrUpdate(data)
    res.status(201).json({message:"New Book added..",result:books[books.length-1]})
}

const getAllBooks = (req,res)=>{
    const data = getData()
    const books = data.books 
    if(books.length==0)
      return  res.status(404).json({error:"No books found"})
    res.status(200).json({message:"List of Books",result:books})
}

const patchBookById = (req,res)=>{
    const id = parseInt(req.params.id)
    const updatedBook = req.body
    const data = getData()
    const books = data.books 
    const index = books.findIndex(book=>book.id==id)
    if(index==-1)
        return res.status(404).json({error:"Book not found to update"})
    books[index] = {...books[index],...updatedBook}
    addOrUpdate(data)
    res.status(201).json({message:"Book updated sucessfully",result:books[index]})
}

const deleteBookById = (req,res)=>{
    const id = parseInt(req.params.id)
    const data = getData()
    const books = data.books 
    const index = books.findIndex(book=>book.id==id)
    if(index==-1)
        res.status(404).json({error:"Book not found to delete"})
    const removed  = books[index]
    const filterBooks = books.filter(books=>books.id != id)
    data.books = filterBooks
    addOrUpdate(data)
    res.status(201).json({message:"removed successfuly",deleted:removed})
}

module.exports ={
    addNewBook,
    getAllBooks,
    patchBookById,
    deleteBookById
}