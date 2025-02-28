function Book(title, author, year) {
    this.title = title
    this.author = author
    this.year = year
  }
  
  Book.prototype.getSummary = function() {
    return `${this.title} by ${this.author}, published in ${this.year}`
  }
  
  let books = [
    new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979),
    new Book("1984", "George Orwell", 1949),
    new Book("Brave New World", "Aldous Huxley", 1932)
  ]
  
  export { books }