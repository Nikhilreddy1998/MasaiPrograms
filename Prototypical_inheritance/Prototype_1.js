function Animal() {
    this.type = "Animal"
  }
  
  Animal.prototype.sound = function() {
    console.log("Animal sound")
  }
  
  function Dog() {
    Animal.call(this)
  }
  
  Dog.prototype = Object.create(Animal.prototype)
  Dog.prototype.constructor = Dog
  
  Dog.prototype.sound = function() {
    console.log("Bark")
  }
  
  let myDog = new Dog()
  myDog.sound()