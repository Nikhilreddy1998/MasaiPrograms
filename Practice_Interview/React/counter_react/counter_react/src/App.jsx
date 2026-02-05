import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const increment=()=>{
    setCount(prev=>prev+1)
  }
  const decrement=()=>{
    setCount(prev=>prev-1)
  }

  return (
    <>
     <h1>count is :{count}</h1>
     <button onClick={increment}>+1</button>
     <button onClick={decrement}>-1</button>
    </>
  )
}

export default App
