import React from "react";
import { useNavigate } from "react-router-dom";

const Loginpage=()=>{
const navigate=useNavigate()
const handlelogin=()=>{
    alert("login sucess")
    navigate('/home')

}
 return(
        <>
        <h1>Login Page</h1>
        <button onClick={handlelogin}>Login</button>
        </>
    )
}
export default Loginpage