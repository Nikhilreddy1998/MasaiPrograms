import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, cartItemsCount, cartSubtotal } = useContext(CartContext);

  if (cartItemsCount === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default Cart;