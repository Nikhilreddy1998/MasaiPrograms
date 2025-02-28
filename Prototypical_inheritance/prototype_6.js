function Book(title, author, isAvailable = true) {
    this.title = title
    this.author = author
    this.isAvailable = isAvailable
  }
  
  function Member(name) {
    this.name = name
    this.borrowedBooks = []
  }
  
  Member.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length >= 3) {
      console.log(`${this.name} cannot borrow more than 3 books.`)
      return
    }
    if (book.isAvailable) {
      book.isAvailable = false
      this.borrowedBooks.push(book.title)
      console.log(`${this.name} borrowed ${book.title}.`)
    } else {
      console.log(`${book.title} is already borrowed.`)
    }
  }
  
  function PremiumMember(name) {
    Member.call(this, name)
    this.specialCollectionAccess = true
  }
  
  PremiumMember.prototype = Object.create(Member.prototype)
  PremiumMember.prototype.constructor = PremiumMember
  
  PremiumMember.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length >= 5) {
      console.log(`${this.name} cannot borrow more than 5 books.`)
      return
    }
    Member.prototype.borrowBook.call(this, book)
  }
  
  let book1 = new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams")
  let book2 = new Book("1984", "George Orwell")
  let book3 = new Book("Brave New World", "Aldous Huxley")
  let book4 = new Book("Dune", "Frank Herbert")
  let book5 = new Book("Foundation", "Isaac Asimov")
  
  let member1 = new Member("Alice")
  let premiumMember1 = new PremiumMember("Bob")
  
  member1.borrowBook(book1)
  member1.borrowBook(book2)
  member1.borrowBook(book3)
  member1.borrowBook(book4)
  
  premiumMember1.borrowBook(book1)
  premiumMember1.borrowBook(book2)
  premiumMember1.borrowBook(book3)
  premiumMember1.borrowBook(book4)
  premiumMember1.borrowBook(book5)
  
  let aliceBorrow = member1.borrowBook.bind(member1)
  aliceBorrow(book5)