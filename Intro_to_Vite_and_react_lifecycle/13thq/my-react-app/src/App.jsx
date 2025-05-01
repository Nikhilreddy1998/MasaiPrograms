import { useState,useEffect } from 'react'
import './App.css'
import Display from './components/Display'
import Increment from './components/Increment'
import Decrement from './components/Decrement'
import Reset from './components/Reset'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    console.log("count Mounted")
    return()=>{
      console.log("Count Unmounted")
    }
  },[])
  useEffect(()=>{
    console.log(`count updated to ${count}`)
  },[count])
  return (
  <>
  <Display count={count}/>
  <Increment setCount={setCount}/>
  <Decrement setCount={setCount}/>
  <Reset setCount={setCount}/>
  </>
)
}

export default App
