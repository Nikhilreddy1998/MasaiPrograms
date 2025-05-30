import {configureStore} from "@reduxjs/toolkit"
import carbonReducer from '../features/carbon/carbonSlice'

export const store=configureStore({
    reducer:{
        carbon:carbonReducer,
    },
})