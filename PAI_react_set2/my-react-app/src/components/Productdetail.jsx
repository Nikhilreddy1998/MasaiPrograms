import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

function Productdetails(){
    const{id}=useParams()
    const[details,setDetails]=useState([])
    async function fetchdetails(){
        let response=await fetch(`https://fakestoreapi.com/products/${id}`)
        let result=await response.json()
        setDetails(result)
    }
    useEffect(()=>{
      fetchdetails()
    },[])


    return(
        <>
        <div>
            <img src={details.image} width="200px"/>
            <p>{details.price}</p>
            <p>{details.title}</p>
        </div>
        <h1>Productdetails</h1>
        </>
    )
}

export default Productdetails