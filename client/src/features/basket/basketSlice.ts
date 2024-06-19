import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../model/basket";


export interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
    basket: null
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketReducer: (state, action) => {
            state.basket = action.payload;
        },
        removeItemReducer: (state, action) => {
            if (!state.basket)
                return;

            const itemIndex = state.basket.basketItems.findIndex(i => i.productId === action.payload.productId);

            if (itemIndex > -1) {
                state.basket.basketItems[itemIndex].quantity -= action.payload.quantity;

                if (state.basket.basketItems[itemIndex].quantity <= 0) {
                    state.basket.basketItems.splice(itemIndex, 1);
                }
            }
        },
    }
});

export const {setBasketReducer, removeItemReducer } = basketSlice.actions;
