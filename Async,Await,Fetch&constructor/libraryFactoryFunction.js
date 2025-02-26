function createBook(title, author) {
    return {
        title,
        author,
        details() {
            console.log(`Title: ${this.title}, Author: ${this.author}`);
        }
    };
}

function createLibrary() {
    const books = [];

    return {
        addBook(book) {
            books.push(book);
        },
        removeBook(title) {
            const index = books.findIndex(book => book.title === title);
            if (index !== -1) {
                books.splice(index, 1);
                console.log(`Removed book: ${title}`);
            } else {
                console.log(`Book not found: ${title}`);
            }
        },
        listBooks() {
            if (books.length === 0) {
                console.log("No books in the library.");
            } else {
                books.forEach(book => book.details());
            }
        }
    };
}

const library = createLibrary();
const book1 = createBook("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = createBook("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);
library.listBooks();

library.removeBook("1984");
library.listBooks();
