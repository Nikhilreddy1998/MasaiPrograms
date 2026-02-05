//In class functions are considered as first class citizens
//Function methods call,apply,bind
//call


//function.call(thisArg, arg1, arg2, ...)


function greet(age,city){
    console.log(`Hi ${this.name} your age is ${age} lives in ${city} `)
}
let obj1={
    name:"Nikhil"
}
greet.call(obj1,27,"Hyderabad")
// here obj1 acts like parent for function greet

//apply
// same as call but arguments are passed as an array
let obj2={
    team:"India"
}
function welcome(time,date){
   console.log(`Welcome team ${this.team} your match at ${time,date}`)
}
welcome.apply(obj2,[8,2026])

//bind
//it returns a new function with this permanently bound.
let obj3={
    cookie:"Biscuit"
}
function breakFast(a,n){
    console.log(`eat ${this.cookie} with ${a} and ${n}`)
}

let bound=breakFast.bind(obj3,"milk","cream")
bound()