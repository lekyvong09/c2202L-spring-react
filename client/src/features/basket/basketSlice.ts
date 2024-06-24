import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../model/basket";
import axios from "axios";


export interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
}


export const addBasketItemThunk = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItem',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            const response = await axios.post(`baskets?productId=${productId}&quantity=${quantity}`, {});
            return response.data;
        } catch (err : any) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const removeBasketItemThunk = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
    'basket/removeBasketItem',
    async ({productId, quantity}, thunkAPI) => {
        try {
            await axios.delete(`baskets?productId=${productId}&quantity=${quantity}`);
        } catch (err : any) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketReducer: (state, action) => {
            state.basket = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemThunk.pending, (state, action) => {
            console.log(action);
            state.status = 'loadingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemThunk.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemThunk.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });

        builder.addCase(removeBasketItemThunk.pending, (state, action) => {
            console.log(action);
            state.status = 'loadingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemThunk.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemThunk.fulfilled, (state, action) => {
            state.status = 'idle';

            const itemIndex = state.basket?.basketItems.findIndex(i => i.productId === action.meta.arg.productId);

            if (itemIndex !== undefined && itemIndex > -1) {
                state.basket!.basketItems[itemIndex].quantity -= action.meta.arg.quantity;

                if (state.basket!.basketItems[itemIndex].quantity <= 0) {
                    state.basket!.basketItems.splice(itemIndex, 1);
                }
            }
        });
    },
});

export const {setBasketReducer } = basketSlice.actions;
