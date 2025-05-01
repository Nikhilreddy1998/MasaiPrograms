import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
      <div>
        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
        <input
          type="number"
          id={`quantity-${item.id}`}
          value={item.quantity}
          min="1"
          onChange={(e) => updateQuantity(item.id, e.target.value)}
          style={{ width: '50px', margin: '0 10px' }}
        />
      </div>
      <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;