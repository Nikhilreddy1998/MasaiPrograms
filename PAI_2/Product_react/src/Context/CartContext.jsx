import React, { createContext, useContext, useState } from "react";

const Cartcontext = createContext();


export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return <Cartcontext.Provider value={{cart,setCart}}>
    {children}
    </Cartcontext.Provider>;
};

export const useCart= ()=>useContext(Cartcontext);