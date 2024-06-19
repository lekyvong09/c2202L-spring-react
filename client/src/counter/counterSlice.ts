import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";


export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
    value: 0,
    status: 'idle'
};


export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount);
        return response.data;
    }
);


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByNumber: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
            state.value += action.payload;
            state.status = 'idle';
        })
        .addCase(incrementAsync.rejected, state => {
            state.status = 'failed';
        })
    }
});

export const {increment, decrement, incrementByNumber} = counterSlice.actions;
export default counterSlice.reducer;
