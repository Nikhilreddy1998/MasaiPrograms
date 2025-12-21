import {useEffect,useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
const [info,setInfo]=useState({data:null})
 useEffect(()=>{
  async function fetchData(){
    const response= await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const result = await response.json();
    console.log(result)
    setInfo({data:result})
  }
   
  fetchData()
 },[])

  return (
  <>
  <div>
  {info.data&&info.data.results.map((res,index)=>(<p key={index}>{res.name}</p>))}
  </div>
  </>
  )
}

export default App
