import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

//provider
const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

//consume the context 

const useProduct= ()=>useContext(ProductContext)

export {useProduct, ProductContextProvider}