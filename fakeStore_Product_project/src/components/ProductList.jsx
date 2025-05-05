import React, { useEffect, useState } from "react";
import { useProduct } from "../context/Productcontext";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
const ProductList = () => {
  const { products, setProducts } = useProduct();
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {cartData, setCartData}= useCart()

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await axios("https://fakestoreapi.com/products");
      let productData = response.data;
      setProducts(productData);
      console.log(productData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!products.length)
    fetchProducts();
  }, []);

  const handleClickView = (id) => {
    navigate("/product/:${id}");
  };

  const handleAddCart=(product)=>{
     setCartData([...cartData,product])
     navigate('cart')
  }

  return (
    <div>
      {isLoading ? (
        <h1>Loading going ON</h1>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            margin: "30px",
          }}
        >
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                <img src={product.image} alt={product.title} width="200px" />
                <h2>Title: {product.title}</h2>
                <h3>Category: {product.category}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickView(product.id);
                  }}
                >
                  View Product
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddCart(product);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
