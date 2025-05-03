import { useState,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './components/Timer'

function App() {
  const[show,setShow]=useState(false)
  return(
  <>
  {show&&<Timer/>}
  <button onClick={()=>setShow(!show)}>Start/Stop</button>
  </>
  )

}

export default App
