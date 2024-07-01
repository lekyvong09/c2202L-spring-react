import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../model/product";
import axios from "axios";


export const productAdapter = createEntityAdapter<Product>();

export const fetchProductThunk = createAsyncThunk<any>(
    'catalog/fetchProducts',
    async () => {
        try {
            const response = await axios.get('products/search');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);


export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
    'catalog/fetchProductsById',
    async (productId) => {
        try {
            const response = await axios.get(`products/${productId}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const fetchBrandAndCategoryForFilterThunk = createAsyncThunk<any>(
    'catalog/fetchBrandAndCategoryForFilter',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('products/get-filter');
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        status: 'idle',
        productLoad: false,
        brands: [],
        categories: [],
        filtersLoaded: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductThunk.pending, (state, action) => {
            state.status = 'loadingFetchProducts';
        });
        builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productLoad = true;
            productAdapter.setAll(state, action.payload.data);
        });
        builder.addCase(fetchProductThunk.rejected, (state, action) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductByIdThunk.pending, (state, action) => {
            state.status = 'loadingFetchProductsById';
        });
        builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productLoad = true;
            productAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(fetchProductByIdThunk.rejected, (state, action) => {
            state.status = 'idle';
        });

        builder.addCase(fetchBrandAndCategoryForFilterThunk.pending, (state, action) => {
            state.status = 'pendingFetchBrandAndCategoryForFilter';
        });
        builder.addCase(fetchBrandAndCategoryForFilterThunk.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.categories = action.payload.categories;
            state.status = 'idle';
            state.filtersLoaded = true;
        });
        builder.addCase(fetchBrandAndCategoryForFilterThunk.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    }
});