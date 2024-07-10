import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../model/product";
import axios from "axios";
import { RootState } from "../../store";
import { PaginationResponse } from "../../model/pagination";

interface CatalogState {
    productLoad: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    categories: string[];
    productParams: ProductParams;
    pagination: PaginationResponse;
}

export const productAdapter = createEntityAdapter<Product>();

export const fetchProductThunk = createAsyncThunk<any>(
    'catalog/fetchProducts',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        const params = new URLSearchParams();

        params.append('pageNumber', (state.catalog.productParams.pageNumber - 1).toString());
        params.append('pageSize', state.catalog.productParams.pageSize.toString());
        params.append('sort', state.catalog.productParams.sort);

        if (state.catalog.productParams.name) {
            params.append('name', state.catalog.productParams.name);
        }
        if (state.catalog.productParams.categories) {
            params.append('category', state.catalog.productParams.categories.toString());
        }
        if (state.catalog.productParams.brands) {
            params.append('brand', state.catalog.productParams.brands.toString());
        }

        try {
            const response = await axios.get('products/search', {params: params});
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
    initialState: productAdapter.getInitialState<CatalogState>({
        status: 'idle',
        productLoad: false,
        brands: [],
        categories: [],
        filtersLoaded: false,
        productParams: {
            pageNumber: 1,
            pageSize: 6,
            sort: 'name'
        },
        pagination: {
            number: 0,
            totalElements: 0,
            totalPages: 0,
            size: 0
        }
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productLoad = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productLoad = false;
            state.productParams = {...state.productParams, ...action.payload};
        },
        resetProductParams: (state, action) => {
            state.productParams = {
                pageNumber: 1,
                pageSize: 6,
                sort: 'name'
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductThunk.pending, (state, action) => {
            state.status = 'loadingFetchProducts';
        });
        builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productLoad = true;
            productAdapter.setAll(state, action.payload.data);
            state.pagination = action.payload.page;
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


export const {setProductParams, resetProductParams, setPageNumber} = catalogSlice.actions;