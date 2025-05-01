import React from "react";
import Child from './Child'

function Middle ({message}){
    return (
    <>
    <h2>I am Middle </h2>
    <p>Below is a child component</p>
    <Child message={message}/>
    </>
    )
}
export default Middle;