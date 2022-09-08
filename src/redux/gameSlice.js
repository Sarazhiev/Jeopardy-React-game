import { createSlice } from '@reduxjs/toolkit';



const sidebarSlice = createSlice({
    name: 'gameState',
    initialState: {
        categories: [],
        questions: [],
        isActive: false
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        addQuestions: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.questions = [...state.questions, ...action.payload];
                return;
            }
            state.questions = [...state.questions, action.payload];
        },
        changeActive: (state, action) => {
            state.isActive = action.payload
        }
    },
});

export const { setCategories, addQuestions, changeActive } = sidebarSlice.actions;
export default sidebarSlice.reducer;
