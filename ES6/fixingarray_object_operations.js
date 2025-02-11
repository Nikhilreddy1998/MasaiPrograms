const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],
    addBook(book) {
      if (!book.title || !book.author || !book.year) {
        console.log("Book information is incomplete.");
        return
      }
  
      if (this.books.find(existingBook => existingBook.title.toLowerCase() === book.title.toLowerCase())) {
        console.log("Book already exists");
        return
      }
  
      this.books.push(book);
      return true;
    },
    findBookByTitle(title) {
      return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    },
    removeBook(title) {
      const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
      if (index !== -1) {
        this.books.splice(index, 1);
        return true;
      } else {
        console.log("Book Not Found cannot be removed");
        return
      }
    }
  };
  library.addBook({ title:"sherlock holmes",author: "George Orwell", year: 1949 })
  console.log(library.books.length)
  library.addBook({ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 })
  console.log(library.books.length)
  