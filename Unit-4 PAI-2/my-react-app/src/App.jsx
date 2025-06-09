import { useState } from 'react'
import './App.css'
import Names from './pages/Names'
import { Routes, Route } from "react-router";
import Navbar from './pages/Navbar';
import About from './pages/About';
import Image from './pages/image';

function App() {
 
  

  return (
    <>
  <h1>Various types of Pokemon</h1>
  <Navbar/>
  <Routes>
     <Route path="/" element={<Names />} />
     <Route path="about" element={<About />} />
  </Routes>
  <div >
   <Names/>
   <Image/>
   </div>
    </>
  )
}

export default App
