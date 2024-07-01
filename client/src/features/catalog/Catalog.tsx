import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { fetchBrandAndCategoryForFilterThunk, fetchProductThunk, productAdapter } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from "@mui/material";


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
        categories
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

    if (status.includes('loading'))
        return <LoadingComponent />;

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb:2}}>
                    <TextField 
                        label="Search product"
                        variant="outlined"
                        fullWidth
                    />
                </Paper>
                
                <Paper sx={{mb:2, p:2}}>
                    <FormControl>
                        <FormLabel id="radio-buttons">Sort</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons"
                            defaultValue="name"
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
                    <FormGroup>
                        {categories.map((category: string) => (
                            <FormControlLabel 
                                label={category}
                                key={category}
                                control={<Checkbox />}
                            />
                        ))}
                    </FormGroup>
                </Paper>
                <Paper sx={{mb:2, p:2}}>
                    <FormGroup>
                        {brands.map((brand: string) => (
                            <FormControlLabel 
                                label={brand}
                                key={brand}
                                control={<Checkbox />}
                            />
                        ))}
                    </FormGroup>
                </Paper>


            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
        </Grid>
    );
}