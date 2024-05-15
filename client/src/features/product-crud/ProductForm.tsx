import { Send } from "@mui/icons-material";
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ProductForm() {
    const formData = new FormData();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [unitsInStock, setUnitsInStock] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [image, setImage] = useState({preview: "", file: ""});

    const handleFileUpload = (event: any) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
        });
        event.target.value = null;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();

        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        };

        formData.append('name', name);
        formData.append('description', description);
        formData.append('unitPrice', unitPrice);
        formData.append('brand', brand);
        formData.append('unitsInStock', unitsInStock);
        formData.append('productCategory', productCategory);
        formData.append('productImage', image.file);

        axios.post('http://localhost:8080/api/products', formData, config)
            .then(response => {
                console.log(response);
                setName('');
                setDescription('');
                setUnitPrice('');
                setBrand('');
                setUnitsInStock('');
                setProductCategory('');
                setImage({preview: "", file: ""});

                formData.delete('name');
                formData.delete('description');
                formData.delete('unitPrice');
                formData.delete('brand');
                formData.delete('unitsInStock');
                formData.delete('productCategory');
                formData.delete('productImage');
            })
            .catch(error => console.log(error));
    };

    return (
        <Container>
            <Grid container>
                <Grid item xs={8} md={6}>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={2} pt={5}>
                            <TextField 
                                id="product-form-title"
                                label="Product Name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <TextField 
                                id="product-form-desc"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <TextField 
                                id="product-form-price"
                                label="Unit Price"
                                variant="outlined"
                                value={unitPrice}
                                onChange={(event) => setUnitPrice(event.target.value)}
                            />
                            <TextField 
                                id="product-form-brand"
                                label="Brand"
                                variant="outlined"
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                            />
                            <TextField 
                                id="product-form-title"
                                label="Units in stock"
                                variant="outlined"
                                value={unitsInStock}
                                onChange={(event) => setUnitsInStock(event.target.value)}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productCategory}
                                    label="Category"
                                    onChange={(event: SelectChangeEvent) => setProductCategory(event.target.value as string)}
                                >
                                    <MenuItem value={'COMIC'}>COMIC</MenuItem>
                                    <MenuItem value={'FICTION'}>FICTION</MenuItem>
                                    <MenuItem value={'ROMANTIC'}>ROMANTIC</MenuItem>
                                    <MenuItem value={'PROGRAMMING'}>PROGRAMMING</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField 
                                type="file"
                                onChange={(event) => handleFileUpload(event)}
                            />
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<Send />}
                        >Add Product</Button>
                    </form>
                </Grid>
                <Grid item xs={4} md={6}>
                    {image.preview && <img src={image.preview} alt="productImage"/>}
                </Grid>
            </Grid>
        </Container>
    );
}