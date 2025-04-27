import { useState } from 'react'
function Reset({setCount}){
    return(
        <button onClick={()=>setCount(prev=>0)}>Reset</button>
    )
}
export default Reset