import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    const navStyle={
        display:"flex",
        justifyContent:"center",
        padding:'10px 0',
        gap:"20px"
    }
    return(
        <>
        <nav style={navStyle}>
            <Link to ='/home'>Home</Link>
            <Link to ='/about'>About</Link>
            <Link to ='/contact'>Contact</Link>
        </nav>
        </>
    )
}

export default Navbar