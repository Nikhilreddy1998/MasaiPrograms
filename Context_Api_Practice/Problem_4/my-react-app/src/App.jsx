import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DataComponent } from './components/DataComponent'



function App() {
  return(
    <>
    <DataComponent/>
    <h1>Hello from react</h1>
    </>
  )

}

export default App
