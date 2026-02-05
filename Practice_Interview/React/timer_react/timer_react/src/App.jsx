import { useState } from 'react'
import './App.css'

function App() {
  const [count,setCount]=useState(0)
  const timer=()=>{
    setInterval(()=>{
     setCount(prev=>prev+1)
    },1000)
  }
  return (
    <>
    <h1>timer:{count}</h1>
    <button onClick={timer}>start</button>
    </>
  )
}

export default App
