import React from "react";
import { useProducts } from "../Context/ProductContextProvider";

import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { useCart } from "../Context/CartContext";
export const ProductList = () => {
  const { products, setProducts } = useProducts();

  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        "https://dummyjson.com/products/category/smartphones"
      );
      let productsItems = response.data.products;
      setProducts(productsItems);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (id) => {
    navigate(`product/${id}`);
  };

  const handleAdd = (product) => {
    setCart([...cart, product]);
    navigate("cart");
  };

  return (
    <main>
      {products?.map((product) => (
        <div
          key={product.id}
          className="productCard"
          onClick={() => handleClick(product.id)}
        >
          <img
            src={product.images[0]}
            alt={product.category}
            className="imageCard"
          />
          <h3>Brand: {product.brand}</h3>
          <h3>Title: {product.title}</h3>
          <h4>Price: {product.price}</h4>
          <h5>Rating: {product.rating}</h5>
          <p>Description: {product.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd(product);
            }}
          >
            Add Cart
          </button>
        </div>
      ))}
    </main>
  );
};
