class Book {
  title: string;
  author: string;
  reviews: string[];
  constructor(title: string, author: string, reviews: string[]) {
    this.title = title;
    this.author = author;
    this.reviews = reviews;
  }

  clone(): Book {
    return new Book(this.title, this.author, [...this.reviews])
  }
}

const reviews = ["Excellent!", "Very Informative"];
const original = new Book("Design Patterns", "GoF", reviews);
const cloned = original.clone();

cloned.reviews.push("Must Read");

console.log("Original Book Reviews:", original.reviews);
console.log("Cloned Book Reviews:", cloned.reviews);
