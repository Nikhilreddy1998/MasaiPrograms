function shopping(){
let cart = []
function addItem(item){
    cart.push(item)
}
function removeItem(index){
    if(index>=0&&index<cart.length)
    {
        cart.splice(index,1)
    }
}
function displayCart(){
    console.log(cart)
    console.log(gettotal())
}
function gettotal(){
    return cart.reduce((total,index)=>total+index.price,0)
}

addItem({ id: 1, name: "Book", price: 15.99 });
addItem({ id: 2, name: "Pen", price: 2.49 });
addItem({ id: 3, name: "Notebook", price: 4.99 });
removeItem(2);
addItem( { id: 4, name: "Eraser", price: 1.29 });

displayCart()
}
shopping()
