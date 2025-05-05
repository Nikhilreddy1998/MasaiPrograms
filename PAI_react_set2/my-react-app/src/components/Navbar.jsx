import React from "react";
import {Link } from "react-router-dom"
function Navbar(){
    return(
        <>
        <nav style={{display:"flex",justifyContent:"center",gap:"20px"}}>
            <Link to='/home'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/home'>Contact</Link>


        </nav>
        </>
    )
}

export default Navbar