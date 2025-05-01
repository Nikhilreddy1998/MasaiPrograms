import React, { createContext, useState, useReducer, useEffect } from 'react';
import { cartReducer } from './cartReducer';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(state.cartItems.length);
    setCartSubtotal(
      state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [state.cartItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartItemsCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};