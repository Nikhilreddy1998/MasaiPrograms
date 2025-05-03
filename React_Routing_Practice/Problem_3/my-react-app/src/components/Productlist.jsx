import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Productlist(){
    const[products,setProducts]=useState([])
     
    async function fetchdata(){
        let response=await fetch("https://fakestoreapi.com/products")
        let result=await response.json()
        setProducts(result)
    }

    useEffect(()=>{
      fetchdata()
    },[])
    return(
        <>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
            {products.map(product=>(
                <div key={product.id}>
                    <img src={product.image} width='200px'/>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <Link to ={`/product/${product.id}`}>View Product</Link>
                </div>
            ))}
        </div>
        </>
    )
}
export default Productlist