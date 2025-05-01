import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ProductsProvider} from './context/ProductsContext'
import {CartProvider} from './context/CartContext'
import {BrowserRouter as Router} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <ProductsProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
            </ProductsProvider>
        </Router>
    </React.StrictMode>
)
