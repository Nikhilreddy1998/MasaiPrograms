import { useState } from 'react'
function Increment({setCount}){
    return(
        <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
    )
}
export default Increment