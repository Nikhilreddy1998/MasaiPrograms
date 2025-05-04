import React, { createContext, useState } from "react";

export const ProductsContext=createContext()

function Product({children}){
const[state,setState]=useState({
    data:null
})
    async function fetchdata(){
        let response=await fetch(" https://fakestoreapi.com/products")
        let result = await response.json()
        setState({...state,data:result})
    }

return(
    <>
    <ProductsContext.Provider value={{state,fetchdata}}>
        {children}
    </ProductsContext.Provider>
    </>
)
   

}

export default Product