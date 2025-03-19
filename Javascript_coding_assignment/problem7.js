/*### **Q7. Create a constructor function for a ****Person** (10 Marks)

Create a constructor function Person that takes name and age. Add a method introduce() that logs "Hi, my name is {name} and I am {age} years old.".

js
function Person(name, age) {
   // Your code here
}
const john = new Person("John", 30);
john.introduce();
// Output: Hi, my name is John and I am 30 years old.

*/
function Person(name,age){
    this.name=name
    this.age=age
    this.introduce=function(){
        console.log(`Hi my name is ${this.name} and I am ${this.age} years old`)
    }
}
let person1=new Person("Nikhil",26)
person1.introduce()