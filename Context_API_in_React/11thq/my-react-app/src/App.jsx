import { useState} from 'react';
import './App.css';

function App() {
 const[name,setName]=useState("Nikhil")

 function Parent({name}){
    return(
        <Child name={name}/>
    )
 }
 function Child({name}){
    return(
        <Grandchild name={name}/>
    )
 }
 function Grandchild({name}){
    return(
        <h1>I am the Grandchild of {name}</h1>
    )
 }
return (
    <Parent name={name}/>
)

}

export default App;