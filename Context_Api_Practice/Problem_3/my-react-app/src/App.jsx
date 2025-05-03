import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const UserContext=createContext()

function Box({children}){
  return(
  <div style={{border:"2px Solid red",padding:"10px"}}>
  {children}
  </div>
  )
}

function App() {
return(
  <>
  <Box>
  <h1>I am heading</h1>
  <p>I am paragraph</p>
  </Box>
  </>
)
}

export default App
