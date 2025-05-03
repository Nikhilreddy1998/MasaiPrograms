import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const[name,setName]=useState("Nikhil")
return(
  <Parent name={name}/>
)
}
function Parent({name}){
return(
  <Child name={name}/>
)
}
function Child({name}){
  return(
    <GrandChild name={name}/>
  )
}
function GrandChild({name}){
  return(
    <h1>I am your Grandfather myself {name} </h1>
  )
}

export default App
