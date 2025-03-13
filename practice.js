let myfetch=fetch("https://fakestoreapi.com/products")
myfetch
.then((res)=>{
  return res.json()
})
.then((res)=>{
  let narr=res.filter((ele)=>{
    return ele.id
  })
  console.log(narr)
  console.log(res)
})
.catch((rej)=>{
    console.log("error")
})