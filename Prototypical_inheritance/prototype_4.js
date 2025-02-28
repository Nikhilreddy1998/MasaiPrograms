function Product(name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
  }
  
  function Electronics(name, price, quantity, brand, model) {
    Product.call(this, name, price, quantity)
    this.brand = brand
    this.model = model
  }
  
  Electronics.prototype = Object.create(Product.prototype)
  Electronics.prototype.constructor = Electronics
  
  Electronics.prototype.powerOn = function() {
    console.log(`${this.name} (${this.brand} ${this.model}) is powered on.`)
  }
  
  Electronics.prototype.powerOff = function() {
    console.log(`${this.name} (${this.brand} ${this.model}) is powered off.`)
  }
  
  function Clothing(name, price, quantity, size, color) {
    Product.call(this, name, price, quantity)
    this.size = size
    this.color = color
  }
  
  Clothing.prototype = Object.create(Product.prototype)
  Clothing.prototype.constructor = Clothing
  
  Clothing.prototype.displayDetails = function() {
    console.log(`${this.name} (Size: ${this.size}, Color: ${this.color})`)
  }
  
  function Book(name, price, quantity, author, genre) {
    Product.call(this, name, price, quantity)
    this.author = author
    this.genre = genre
  }
  
  Book.prototype = Object.create(Product.prototype)
  Book.prototype.constructor = Book
  
  Book.prototype.displayInfo = function() {
    console.log(`${this.name} by ${this.author} (Genre: ${this.genre})`)
  }
  
  let laptop = new Electronics("Laptop", 1200, 5, "Dell", "XPS 13")
  let tShirt = new Clothing("T-Shirt", 25, 10, "M", "Blue")
  let book = new Book("The Hitchhiker's Guide to the Galaxy", 15, 20, "Douglas Adams", "Science Fiction")
  
  laptop.powerOn()
  laptop.powerOff()
  tShirt.displayDetails()
  book.displayInfo()