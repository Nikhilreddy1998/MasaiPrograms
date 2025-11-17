// Create a Book class with:
// title, author, and price
// Use this keyword in the constructor
// Create an instance using new Book(...) and log all properties
var Book = /** @class */ (function () {
    function Book(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
    Book.prototype.BookDetails = function () {
        console.log("Book Title: ".concat(this.title, "\n Author: ").concat(this.author, "\n Price: ").concat(this.price));
    };
    return Book;
}());
var B1 = new Book("Atomic habits", "James clear", 200);
B1.BookDetails();
var B2 = new Book("Rich Dad Poor Dad", "J. K. Thomas", 200);
B2.BookDetails();
