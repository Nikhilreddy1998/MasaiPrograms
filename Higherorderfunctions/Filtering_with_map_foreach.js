function processProducts(products) {
    let Names = products.map(ele => ele.name)
  
    products.forEach(ele=> {
      let message = ele.price > 50 ? "is above $50" : "is below $50";
      console.log(`${ele.name} ${message}`)
    })
  }
  
  let products = [
    { name: "Laptop", price: 100},
    { name: "Mouse", price: 10 },
    { name: "Keyboard", price: 25 },
    { name: "Monitor", price: 80 },
    { name: "Webcam", price: 30}
  ]
  
  processProducts(products)
  