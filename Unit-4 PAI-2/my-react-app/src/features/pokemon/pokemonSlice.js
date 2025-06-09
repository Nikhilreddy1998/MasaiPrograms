import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



export const fetchNames=createAsyncThunk("pokemon/fetchNames",async()=>{
    const response=await fetch('https://pokeapi.co/api/v2/pokemon')
    return response.json()
})

const pokemonSlice=createSlice({
    name:"pokemon",
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    extraReducers:builder=>{
        builder
        .addCase(fetchNames.pending,state=>{
            state.loading=true
        })
        .addCase(fetchNames.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload
        })
        .addCase(fetchNames.rejected,(state,action)=>{
            state.loading=false;
            state.data=action.error.message
        })
    }
})

export default pokemonSlice.reducer