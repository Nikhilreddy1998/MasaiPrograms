import { createSlice } from "@reduxjs/toolkit";
 const initialState={
        count:0,
        countanother:10
    }
const counterSlice=createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment:(state)=>{
            console.log(state)
            state.countanother+=1

        } ,
        incrementBy10:(state,action)=>{
            state.countanother+=action.payload

        }
    }
})

export const {increment,incrementBy10}=counterSlice.actions;
export default counterSlice.reducer
