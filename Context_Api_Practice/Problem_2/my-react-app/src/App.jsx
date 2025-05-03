import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const UserContext=createContext()
function App() {
const[name,setName]=useState("Nikhil")
return(
  <UserContext.Provider value={name}>
    <Parent />
  </UserContext.Provider>
 
)
}
function Parent(){
return(
  <Child/>
)
}
function Child(){
  return(
    <GrandChild/>
  )
}
function GrandChild({name}){
  const user=useContext(UserContext)
  return(
    <h1>I am your Grandfather myself {user} </h1>
  )
}

export default App
