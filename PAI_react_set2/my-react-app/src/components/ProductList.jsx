import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import {Link} from "react-router-dom"

function ProductList(){
    const{state,fetchdata}=useContext(ProductsContext)
    return(
        <>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"30px"}}>
            {state.data&&state.data.map((product)=>(
                <div key={product.id}>
                <p>{product.title}</p>
                <img src={product.image} width="200px"/>
                <p>{product.price}</p>
                <Link to={`/product/${product.id}`}>View Product</Link>
                </div>

            ))}
        </div>
        <h1>Products</h1>
        <button onClick={fetchdata}>Get Products</button>
        </>
    )
}

export default ProductList