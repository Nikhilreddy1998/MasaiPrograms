import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

function ProductList(){
    const {state,fetchdata}=useContext(ProductsContext)

    return(
        <>
        <div>
            {state.data&&state.data.map((product)=>(
                <div key={product.id}>
                    <p>{product.title}</p>
                    <img src={product.image} width="200px"/>
                    <p>{product.price}</p>

                </div>
            ))}
        </div>
        <h1>Products</h1>
        <button onClick={fetchdata}>Get Products</button>
        </>
    )
}
export default ProductList