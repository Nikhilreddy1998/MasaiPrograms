import { books } from './books.js'

let bookSummaries = books.map(book => book.getSummary())

console.log(bookSummaries)