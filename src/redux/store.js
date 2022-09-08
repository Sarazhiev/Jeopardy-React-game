import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sidebarSlice from './gameSlice'
import modal from "./modal";
export const store = configureStore({
    reducer: {
        sidebarSlice,
        modal
    }
});