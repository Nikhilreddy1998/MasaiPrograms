import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [data,setData]=useState([])
  useEffect(()=>{
   async function fetchData(){
    try{
      let response = await fetch("https://jsonplaceholder.typicode.com/users")
      let data=await response.json()
      setData(data)
   }catch(err){
    console.log("error",err)
   }
   }
   fetchData()
  },[])
  return (
  <>
  {data.map((user)=>(
    <h3 key={user.id}>{user.name}</h3>

  ))}
  </>
  )
}

export default App
