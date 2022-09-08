import { createSlice } from '@reduxjs/toolkit'


const modal = createSlice({
    name: 'modal',
    initialState: {
        userName: ''
    },
    reducers: {
        saveUserName: (state, action) => {
            state.userName = action.payload
        }
    }
})

export default modal.reducer
export const {saveUserName} = modal.actions