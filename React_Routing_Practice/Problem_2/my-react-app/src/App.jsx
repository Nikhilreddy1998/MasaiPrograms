import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Loginpage from './components/Loginpage'
import Unknown from './components/Unknown'

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Loginpage/>}/>
      <Route path='/home'element={<Home/>}/>
      <Route path='/about'element={<About/>}/>
      <Route path='/contact'element={<Contact/>}/>
      <Route path='*' element={<Unknown/>}/>
    </Routes>
    </>
  )
}

export default App
