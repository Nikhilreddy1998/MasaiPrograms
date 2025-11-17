// Create a Student class with:
// name (string)
// age (number)
// rollNo (number)
// A constructor to initialize all properties
// A method displayDetails() that logs Student: {name}, Age: {age}, Roll No: {rollNo}
// Create two instances of Student and call their displayDetails() method.

class Student{
    name:string
    age:number
    rollNo:number
    
    constructor(name:string,age:number,rollNo:number){
        this.name = name
        this.age = age
        this.rollNo = rollNo
    }

    displayDetails():void{
        console.log(`Student: ${this.name}, Age: ${this.age}, Roll No: ${this.rollNo}`)
    }
}

const S1 = new Student("Yash",23,100)
S1.displayDetails()

const S2 = new Student("Demo",19,101)
S2.displayDetails()
