import { createSlice } from '@reduxjs/toolkit';



const sidebarSlice = createSlice({
    name: 'gameState',
    initialState: {
        categories: [],

    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    },
});

export const { setCategories} = sidebarSlice.actions;
export default sidebarSlice.reducer;
