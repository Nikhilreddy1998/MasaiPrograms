import  {useState,useEffect} from "react";

function Timer(){
    const[count,setCount]=useState(0)
   
   useEffect(()=>{
    console.log("timer started")
    const timer=setInterval(()=>{
       setCount(prev=>prev+1)
       console.log(`seconds:${count}`)
     },1000)
     return()=>{
        clearInterval(timer)
        console.log("Timer stopped")
     }

    },[])

     return(
        <>
        <h1>Time:{count}s</h1>
        </>
     )
}
export default Timer