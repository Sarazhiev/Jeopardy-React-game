import {createSlice} from "@reduxjs/toolkit";

const myState = createSlice({
    name: 'stat',
    initialState: {
        tru: [],
        fal: [],
    },
    reducers: {
        getFalse: (state, action) => {
            state.fal = [...state.fal, action.payload]
        },
        getTrue: (state, action) => {
            state.tru = [...state.tru, action.payload]
        },
        removeFalse: (state, action) => {
            state.fal = action.payload
        },
        removeTrue: (state, action) => {
            state.tru = action.payload
        },
    }
})
export default myState.reducer
export const {getTrue, getFalse, removeFalse, removeTrue} = myState.actions