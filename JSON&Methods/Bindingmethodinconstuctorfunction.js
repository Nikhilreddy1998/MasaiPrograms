function Person(name, age) {
    this.name = name
    this.age = age
  
    this.displayInfo = function() {
      console.log("Name: " + this.name + ", Age: " + this.age);
    }
  }
  
  let person1 = new Person("Nikhil", 26)
  
  
  let displayPerson1Info = person1.displayInfo.bind(person1)
  
  displayPerson1Info()
  
  