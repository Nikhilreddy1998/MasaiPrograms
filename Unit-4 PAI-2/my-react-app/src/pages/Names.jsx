import { useDispatch, useSelector } from "react-redux";
import { fetchNames } from "../features/pokemon/pokemonSlice";
import { useEffect } from "react";




function Names(){
    const {data,loading,error}=useSelector(state=>state.pokemon)
    const dispatch=useDispatch()

    const containerStyle={
        display:"grid",
        gridTemplateColumns: '2fr 1fr',
        backgroundColor:"grey"
    }

    useEffect(()=>{
        dispatch(fetchNames())
    },[dispatch])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error:{error}</p>
    return <div style={containerStyle}>
        {data&&data.results.map((pokemon,index)=>(
            <p key={index}>{pokemon.name}</p>
        ))}
    </div>
}

export default Names