function person() {
    console.log("Name: " + this.name)
    console.log("Age: " + this.age)
  }
  
  let details = {
    name: "Nikhil",
    age: 26
  }
  person.call(details)
  
  
  
 