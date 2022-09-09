import { createSlice } from '@reduxjs/toolkit'


const modal = createSlice({
    name: 'modal',
    initialState: {
        userName: '',
        totalValue: '',
        allPlayers: []
    },
    reducers: {
        saveUserName: (state, action) => {
            state.userName = action.payload
        },
        saveTotalValue: (state, action) => {
            state.totalValue = action.payload
        },
        getAllPlayers: (state, action) => {
            state.allPlayers = [...state.allPlayers, action.payload]
        }
    }
})

export default modal.reducer
export const {saveUserName, saveTotalValue, getAllPlayers} = modal.actions