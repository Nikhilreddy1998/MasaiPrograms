// Write a TypeScript class Person with the following features:
// The class should have name (string) and age (number) as properties.
// It should have a method greet() that returns a greeting message including the person's name and age.
// Additionally, implement a static method isAdult() that checks if the person is an adult (age ≥ 18).


class Person{
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
    
    greet():string{
        return `Hello! my name is ${this.name} & I am ${this.age} years old`
    }

    static isAdult(age:number):boolean{
        return age>=18
    }
}

const P1 = new Person("Yash",22)
console.log(P1.greet())
console.log(Person.isAdult(P1.age))

const P2 = new Person("Demo",17)
console.log(P2.greet())
console.log(Person.isAdult(P2.age))