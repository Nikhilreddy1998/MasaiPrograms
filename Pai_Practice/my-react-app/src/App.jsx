import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import ProductList from './components/ProductList'
import ProductDetail from './components/Productdetail'
import Cart from './components/cart'

function App() {

  return(
    <>
    <Navbar/>
    <Routes>

      <Route path='/cart'  element={<Cart/>}/>
      <Route path='/product/:id'  element={<ProductDetail/>}/>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    </>
  )

}

export default App
