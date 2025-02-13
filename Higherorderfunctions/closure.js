function outer() {
    let message = "Hello Masai School"
  
    function inner() {
      console.log(message)
    }
  
    return inner
  }
  
  let greet = outer()
  greet()
  