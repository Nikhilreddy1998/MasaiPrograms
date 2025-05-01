import React, { useState} from 'react';
import './App.css';



function App() {
   const[name,setName]=useState("")
   const[email,setEmail]=useState("")
   const[change,setChange]=useState("")
   const[mail,setMail]=useState("")
   const modify=(input)=>{
    setEmail(input.target.value)
    }
  const update=(input)=>{
    setName(input.target.value)
    }
    const handle=()=>{
        setChange(name)
        setMail(email)
        setName("")
        setEmail("")
    }
   
   return(
    <>
    <h1>{change}</h1>
    <h2>{mail}</h2>
    <input onChange={update} type="text" placeholder='name' value={name}/>
    <input onChange={modify} type="email" placeholder="email" value={email}/>
    <button onClick={handle}>Change</button>
    </>
   )
 
}

export default App;