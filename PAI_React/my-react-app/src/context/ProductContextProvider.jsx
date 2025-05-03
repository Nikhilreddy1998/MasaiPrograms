import React, { useContext, useState } from "react";
import { createContext } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
//consume the products

export const useProducts = () => useContext(ProductContext);
