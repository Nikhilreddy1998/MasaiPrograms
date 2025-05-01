import React  from 'react';
import {Routes,Route} from 'react-router-dom';
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import './App.css';

function App() {
    return(
        <div>
            <Routes>
                <Route path='/' element={<ProductList/>}/>
                <Route path='/product/:id' element={<ProductDetail/>}/>
                <Route path='/Cart' element={<Cart/>}/>
            </Routes>
        </div>
    )
 
}

export default App;