import React, { useContext } from "react";
import { ThemeContext } from "../DataProvider";

const Child2=()=>{
    const {theme} = useContext(ThemeContext)
    return (
        <p style={{color:"green", border:"2px solid red" , backgroundColor: theme=='light'?'white':'black'}}>I'm child2</p>
    )
}

export default Child2;