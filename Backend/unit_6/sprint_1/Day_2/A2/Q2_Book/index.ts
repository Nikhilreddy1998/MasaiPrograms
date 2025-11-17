
class Book{
    title:string
    author:string
    price:number

    constructor(title:string,author:string,price:number){
        this.title = title
        this.author = author
        this.price = price
    }

    BookDetails():void{
        console.log(`Book Title: ${this.title}\n Author: ${this.author}\n Price: ${this.price}`)
    }
}

const B1 = new Book("Atomic habits","James clear",200)
B1.BookDetails()

const B2 = new Book("Rich Dad Poor Dad","J. K. Thomas",200)
B2.BookDetails()

