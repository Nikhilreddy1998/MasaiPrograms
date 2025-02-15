function greet(name) {
    console.log("Hello, " + this.name);
  }
  
  let person = {
    name: "Nikhil"
  }
  
  setTimeout(greet.bind(person), 5000)
  