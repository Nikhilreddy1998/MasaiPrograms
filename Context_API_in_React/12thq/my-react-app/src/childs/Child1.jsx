import React, { useContext } from "react";
import Child2 from "./child2";
import { ThemeContext } from "../DataProvider";

const Child1=()=>{
    const {theme} = useContext(ThemeContext)
    return (
        <>
        <p style={{color:"green" , border:"2px solid red" , backgroundColor: theme=='light'?'white':'black'}}>I'm child1</p>
        <Child2/>
        </>
        
    )
}

export default Child1;