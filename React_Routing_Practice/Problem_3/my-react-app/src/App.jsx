import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loginpage from './components/Loginpage'
import Unknown from './components/Unknown'
import Productlist from './components/Productlist'
import Productdetails from './components/Productdetails'

function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Productlist/>}/>
      {/* if : colon is there then it is dynamic route*/}
      <Route path='/product/:id' element={<Productdetails/>}/>
      <Route path='*' element={<Unknown/>}/>
    </Routes>
    </>
  )
}

export default App
