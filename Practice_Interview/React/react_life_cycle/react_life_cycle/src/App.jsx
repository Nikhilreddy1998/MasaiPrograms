import { useState } from 'react'
import './App.css'

function App() {
  const [season, setSeason] = useState("spring")
  return (
    <>
    <h1>season is :{season}</h1>
    <button onClick={()=>setSeason("summer")}>Change season to summer</button>
    <button onClick={()=>setSeason("winter")}>Change season to winter</button>
    </>

  )
}

export default App
