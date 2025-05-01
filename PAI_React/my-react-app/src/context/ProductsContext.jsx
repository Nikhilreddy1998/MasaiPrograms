import React, {createContext,useState,useEffect} from 'react';
import useFetch from '../hooks/useFetch';
export const ProductsContext=createContext()
export const ProductsProvider=({children})=>{
    const{data:products,loading,error}=useFetch('https://fakestoreapi.com/products')
    const[allProducts,setAllProducts]=useState([])

    useEffect(()=>{
        if(products){
            setAllProducts(products)
        }
    },[products])

    return (
        <ProductsContext.Provider value={{products:allProducts,loading,error}}>
        {children}
        </ProductsContext.Provider>
    )
}
