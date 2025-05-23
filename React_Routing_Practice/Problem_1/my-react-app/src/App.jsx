import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Landingpage from './components/Landingpage'

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/home'element={<Home/>}/>
      <Route path='/about'element={<About/>}/>
      <Route path='/contact'element={<Contact/>}/>
    </Routes>
    </>
  )
}

export default App
