const fs = require('fs')

// Read Books
function getAvailableBooks(){
   const data =  JSON.parse(fs.readFileSync('./db.json','utf-8'))
   const avlBooks = data.books.filter(book=>book.status=="available")
   return {data,avlBooks}
}

// Write Books
function borrowORreturn(data){
    fs.writeFileSync('./db.json',JSON.stringify(data))
}

// Get current Date
function getDate(){
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth()+1).padStart(2,'0')
    const day = String(today.getDate()).padStart(2,'0')
    const formatedDate  = `${year}-${month}-${day}`
    return formatedDate
}


module.exports = {
    getAvailableBooks,
    borrowORreturn,
    getDate
}