import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

function ProductList() {
  const { products, loading, error } = useContext(ProductsContext);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div>
      <h2>Insurance Products Catalog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {products && products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;