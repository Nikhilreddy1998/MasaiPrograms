let book = { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
let bag=""
for(key in book)
{
  bag=bag+key+": "+book[key]+"  "
}
console.log(bag)