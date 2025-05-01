import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </Router>
  </React.StrictMode>
);