
fetch("https://fakestoreapi.com/products")
.then((res)=>res.json())
.then((res)=>console.log(res)
)

async function getdata(){
    let res=await fetch("https://fakestoreapi.com/products")
    let data=await res.json()
    console.log(data)
}
getdata()

