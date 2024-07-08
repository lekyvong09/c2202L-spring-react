import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { fetchBrandAndCategoryForFilterThunk, fetchProductThunk, productAdapter, setProductParams } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";
import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import CheckboxButton from "../../layout/CheckboxButton";
import PaginationComponent from "../../layout/PaginationComponent";


const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceAsc', label: 'Price - Low to High'},
    {value: 'priceDesc', label: 'Price - High to Low'}
];


export default function Catalog() { 
    const products = productAdapter.getSelectors().selectAll(store.getState().catalog);
    const {
        productLoad, 
        status, 
        filtersLoaded,
        brands,
        categories,
        productParams,
        pagination
    } = useSelector((state: any) => state.catalog);

    useEffect(() => {
        if (!productLoad) {
            store.dispatch(fetchProductThunk());
        }
    }, [productLoad]);

    useEffect(() => {
        if (!filtersLoaded) {
            store.dispatch(fetchBrandAndCategoryForFilterThunk());
        }
    }, [filtersLoaded]);

    if (status.includes('loading') && filtersLoaded === false)
        return <LoadingComponent />;

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb:2}}>
                    <TextField 
                        label="Search product"
                        variant="outlined"
                        fullWidth
                        value={productParams.name || ''}
                        onChange={(e) => store.dispatch(setProductParams({name: e.target.value}))}
                    />
                </Paper>
                
                <Paper sx={{mb:2, p:2}}>
                    <FormControl>
                        <FormLabel id="radio-buttons">Sort</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons"
                            defaultValue="name"
                            value={productParams.sort || 'name'}
                            onChange={(e) => store.dispatch(setProductParams({sort: e.target.value}))}
                        >
                            {sortOptions.map(({value, label}) => (
                                <FormControlLabel
                                    value={value}
                                    label={label}
                                    key={value}
                                    control={<Radio />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb:2, p:2}}>
                    <CheckboxButton 
                        items={categories}
                        currentChecked={productParams.categories}
                        onChange={(items: string[]) => store.dispatch(setProductParams({categories: items}))}
                    />
                </Paper>
                <Paper sx={{mb:2, p:2}}>
                    <CheckboxButton 
                        items={brands}
                        currentChecked={productParams.brands}
                        onChange={(items: string[]) => store.dispatch(setProductParams({brands: items}))}
                    />
                </Paper>


            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>


            <Grid item xs={3} />
            <Grid item xs={9}>
                <PaginationComponent 
                    pagination={pagination}
                    onPageChange={(page: number) => store.dispatch(setProductParams({pageNumber: page}))}
                />
            </Grid>
        </Grid>
    );
}