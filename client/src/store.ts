import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice';
import {basketSlice} from "./features/basket/basketSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        basket: basketSlice.reducer,
    }
});