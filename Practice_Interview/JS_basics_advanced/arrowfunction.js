// ES6 EcmaScript
const add=(a,b)=>{
return a+b
}
console.log(add(2,3))

// single parameter and also implicit return
//single parameter parenthesis are optional
const square =a=>a*a
console.log(square(5))

//example
const greet=name=>{
return `Hello ${name} how are you`
}
console.log(greet("Nikhil"))