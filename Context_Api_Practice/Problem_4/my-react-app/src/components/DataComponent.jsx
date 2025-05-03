import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";


export function DataComponent(){
    const{state,fetchData}=useContext(DataContext)

    return(
        <>
        <button onClick={fetchData}>Get data</button>
        {state.loading&&<p>Loading...</p>}
        {state.data&&state.data.map(post=><p key={post.id}>{post.title}</p>)}
        </>
    )
}