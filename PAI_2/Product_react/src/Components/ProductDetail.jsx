import React, { useEffect, useState } from "react";
import { useProducts } from "../Context/ProductContextProvider";
import { useParams } from "react-router";

export const ProductDetail = () => {
  const { products } = useProducts();
  const [items, setItems] = useState();
  const { id } = useParams();

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id === parseInt(id));
    setItems(foundProduct);
  }, [id, products]);
  return (
    <div>
      {items ? (
        <div key={items.id}>
          <h1>{items.brand}</h1>
        </div>
      ) : (
        console.log("load")
      )}
    </div>
  );
};
