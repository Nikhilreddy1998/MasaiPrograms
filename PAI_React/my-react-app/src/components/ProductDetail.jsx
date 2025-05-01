import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useContext(ProductsContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const product = products ? products.find((p) => p.id.toString() === id) : null;
  const isAlreadyInCart = cartItems.some((item) => item.id === product?.id);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart} disabled={isAlreadyInCart}>
        {isAlreadyInCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
      <button onClick={() => navigate('/')}>Back to Products</button>
    </div>
  );
}

export default ProductDetail;