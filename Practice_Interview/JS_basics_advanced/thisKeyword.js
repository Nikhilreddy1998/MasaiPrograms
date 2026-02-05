// file-->this refer to window
//obj-->this refer to obj
//newobj-->this-->newobj
//without usage of this keyword  it will always look into global scope
// example 1
var example = {
name:"Nikhil",
age:"26",
greet:function(){
return `My name is ${this.name} and my age is ${this.age}`
}
}
console.log(example.greet())


//example 2
let obj={
    name:"Raju",
    age:"27",
    greet:function(){
        return `Hi ${this.name} your age is ${this.age}`
    }
}
console.log(obj.greet())

//Arrow functions do NOT have their own this.
//They inherit this from the surrounding (lexical) scope

const obj1={
    name:"Nikhil",
    age:27,
    greet:()=>{
     return `Hi ${this.name}`
    }
}
console.log(obj1.greet())//Hi undefined