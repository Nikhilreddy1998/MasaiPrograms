import React from 'react'
import { useCart } from '../Context/CartContext';
import { useState } from 'react';

export const Cart = () => {
  const{cart}= useCart();
  const[total,setTotal]= useState(0)
  return (
    <div>
      {cart.map(item=>(
        <div key={item.id}>
          <h1>{item.brand}</h1>
          <h2>{item.price}</h2>
        </div>
      ))}
    </div>
  )
}
