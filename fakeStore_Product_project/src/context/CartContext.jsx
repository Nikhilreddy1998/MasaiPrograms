import { createContext, useContext, useState } from "react";

const CartContext= createContext()

 export const CartContextProvider=({children})=>{

  const [cartData, setCartData] =useState([])
  return <CartContext.Provider value={{cartData,setCartData}}>
          {children}
         </CartContext.Provider>
}

export const useCart= ()=>useContext(CartContext)

