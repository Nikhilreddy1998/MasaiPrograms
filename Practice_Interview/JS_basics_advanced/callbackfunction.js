//It is a function which passes as an arguement to another function.
//example
function greet(){
    console.log("Hello")
}

function sayHi(fn){
  fn()
}

sayHi(greet)