import React, { useState } from 'react'
// import { useProduct } from '../context/Productcontext'
import { useCart } from '../context/CartContext'
export const Cart = () => {
  let {cartData,setCartData}=useCart()
 
  const showTotal=cartData.reduce((acc,curr)=>acc+curr.price,0)
  const handleDelete=(id)=>{
     const updatedData= cartData.filter(item=>item.id!=id)
     setCartData(updatedData)

  }
  return (
    <div>

      {
        cartData.map(product=>(
          <div key={product.id}>
            <h3>{product.title}</h3>
            <h4>Price:{product.price}</h4>
            <button onClick={()=>handleDelete(product.id)}>delete</button>
            <button onClick={()=>handleIncrease(product.id)}>Increase The Quantity</button>
          </div>
        ))
      }
      <h2>TotalPrice: {showTotal}</h2>
     
    </div>
  )
}
