

/*
### **Q3. Calculate total price using ****.reduce()** (10 Marks)

You are given an array of objects representing items in a cart. Calculate the total price using .reduce().
*/


const cart = [
  { name: "Laptop", price: 500 },
  { name: "Phone", price: 200 },
  { name: "Tablet", price: 150 }
]
let totalPrice=cart.reduce((acc,curr)=>{
    curr=curr.price
    acc=acc+curr
    return acc

},0)

console.log(totalPrice)
