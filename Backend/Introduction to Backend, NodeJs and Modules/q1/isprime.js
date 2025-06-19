function isprime(n){
  let count=0
  if(n<2){
    console.log(n,"Not a prime")
    return
  }
  for(let i=1;i<=n;i++){
    if(n%i==0)
      count++
  }
  if(count==2)
  {
    console.log(n,"is Prime")
    return
  }
  else
  {
    console.log(n,"Not a prime")
    return
  }

}

module.exports=isprime