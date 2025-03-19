/*### *Q9. Implement Prototypal Inheritance* (10 Marks)

Create a constructor function Animal(name) with a method speak(). Then, create a Dog constructor that *inherits* from Animal and overrides speak().

js
function Animal(name) {
   // Your code here
}

function Dog(name, breed) {
   // Your code here
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak(); // "Buddy barks!"

*/
class Animal{
    constructor(name1){
    this.name1=name1
    }
    speak(){
        console.log(`${this.name1} barks`)
    }
}
class Dog extends Animal{
    constructor(name1,breed){
        super(name1)
        this.breed=breed
    }
        speak(){
            console.log(`${this.name1} barks!`)
        }
}
const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak()


