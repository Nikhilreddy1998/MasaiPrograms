import React, {useState,useEffect} from "react";
function FetchData(){
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    useEffect(()=>{
          async function fetchdata(){
            setLoading(true)
            try{
            let response=await fetch("https://jsonplaceholder.typicode.com/posts")
            let result=await response.json()
            setData(result)
            console.log(result)
           }
        catch(error){
            console.log(error.message)
        }
        finally{
            
            setLoading(false)
         }
    }
    fetchdata()
         

    },[])

    if(loading){
        return(
            <>
            <h1>Loading...</>
            </>
        )
    }

    return(
        <>
        <h1>Posts</h1>
        {data.slice(0,5).map((post,index)=>(
            <p key={post.id}>{index+1}.{post.title}</p>
           ))}
        </>
    )
}
export default FetchData