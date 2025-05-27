import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterslice.js"
 export const store=configureStore({
    reducer:{counter:counterReducer}
})
