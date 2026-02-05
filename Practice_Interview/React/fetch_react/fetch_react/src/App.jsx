import { useState,useEffect } from 'react'
import './App.css'

function App() {
const [products,setProducts]=useState([])
const [showProducts,setShowProducts]=useState(false)

useEffect(()=>{
if(!showProducts) return
async function fetchProducts(){
  try{
    let res=await fetch("https://fakestoreapi.com/products")
    let data=await res.json()
    setProducts(data)
  }catch(err){
    console.log("something went wrong",err)
  }
}
fetchProducts()
},[showProducts])

return(
  <>
  <h1>Products</h1>
  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
    {products.map((p)=>(
      <div key={p.id}>
      <img src={p.image}/>
      <p>{p.title}</p>
      </div>
    ))}
    <button onClick={()=>setShowProducts(true)}>Display products</button>
  </div>
  </>
)

}

export default App
