const factorial=(n)=>{
  let value=n
  let result=1
  while(n>0){
    result*=n
    n--
  }
  console.log(`factorial of ${value} is ${result}`)
}

module.exports=factorial