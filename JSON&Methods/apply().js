function multiplyNumbers(N1, N2) {
    function multiplier(a, b) {
      return a * b;
    }
  
    return multiplier.apply(null,[N1, N2]); 
  }
  let result = multiplyNumbers(15, 20)
  console.log(result)
  
  