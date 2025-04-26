import { useState } from 'react'
function Decrement({setCount}){
    return(
        <button onClick={()=>setCount(prev=>prev-1)}>Decrement</button>
    )
}
export default Decrement