import { useState } from 'react'
import './App.css'
import Middle from './components/middle'

function App() {
  const message = "Hello From Parent"
return(
  <>
  <h1>I am parent</h1>
  <Middle message={message}/>
  </>
)
}

export default App
