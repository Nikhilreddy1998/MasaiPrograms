import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



// Async thunk to fetch users

export const fetchUsers=createAsyncThunk("features/fetchUsers",async()=>{
    const response= await fetch('https://jsonplaceholder.typicode.com/users')
    return response.json()
})

const userSlice=createSlice({
    name:"users",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers:builder=>{
        builder
        .addCase(fetchUsers.pending, state=>{
            state.loading=true

        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message 
        })
    }
})


export default userSlice.reducer