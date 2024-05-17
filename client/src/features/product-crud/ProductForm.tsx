import { LoadingButton } from "@mui/lab";
import { Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "../../model/product";

interface Props {
    onAddProduct: (data: Product) => void;
}

export default function ProductForm({onAddProduct}: Props) {
    const productSchema = yup.object({
        name: yup.string().required('name is required'),
        description: yup.string().required('description is required'),
        unitPrice: yup.number().positive().required('unitsInStock is required'),
        brand: yup.string().required('brand is required'),
        productCategory: yup.string().required('productCategory is required'),
        unitsInStock: yup.number().positive().integer().required('unitsInStock is required'),
        photoUpload: yup.string(),
    }).required();

    const { 
        register, 
        handleSubmit, 
        control, 
        reset,
        formState: {
            isSubmitting,
            errors,
        }
    } = useForm({resolver: yupResolver(productSchema)});
    


    const formData = new FormData();

    const [image, setImage] = useState({preview: "", file: ""});

    const handleFileUpload = (event: any) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
        });
        event.target.value = null;
    }

    const mySubmit = async (data: FieldValues) => {

        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        };

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('unitPrice', data.unitPrice);
        formData.append('brand', data.brand);
        formData.append('unitsInStock', data.unitsInStock);
        formData.append('productCategory',data.productCategory);
        formData.append('productImage', image.file);

        try {
            const response = await axios.post('http://localhost:8080/api/products', formData, config);
        
            console.log(response);
            setImage({preview: "", file: ""});

            formData.delete('name');
            formData.delete('description');
            formData.delete('unitPrice');
            formData.delete('brand');
            formData.delete('unitsInStock');
            formData.delete('productCategory');
            formData.delete('productImage');

            reset({
                name: '',
                description: '',
                unitPrice: 0.00,
                brand: '',
                unitsInStock: 0,
                productCategory: ''
            });

            onAddProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Grid container>
                <Grid item xs={8} md={6}>
                    <form onSubmit={handleSubmit(mySubmit)}>
                        <Stack spacing={2} pt={5}>
                            <TextField 
                                id="product-form-title"
                                label="Product Name"
                                variant="outlined"
                                {...register('name')}
                                error={errors.name ? true : false}
                                helperText={errors.name?.message?.toString()}
                            />
                            <TextField 
                                id="product-form-desc"
                                label="Description"
                                variant="outlined"
                                {...register('description')}
                                error={errors.description ? true : false}
                                helperText={errors.description?.message?.toString()}
                            />
                            <TextField 
                                id="product-form-price"
                                label="Unit Price"
                                variant="outlined"
                                {...register('unitPrice')}
                                error={errors.unitPrice ? true : false}
                                helperText={errors.unitPrice?.message?.toString()}
                            />
                            <TextField 
                                id="product-form-brand"
                                label="Brand"
                                variant="outlined"
                                {...register('brand')}
                                error={errors.brand ? true : false}
                                helperText={errors.brand?.message?.toString()}
                            />
                            <TextField 
                                id="product-form-unitsInStock"
                                label="Units in stock"
                                variant="outlined"
                                {...register('unitsInStock')}
                                error={errors.unitsInStock ? true : false}
                                helperText={errors.unitsInStock?.message?.toString()}
                            />
                            <Controller 
                                name="productCategory"
                                control={control}
                                render={({field, fieldState}) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Category"
                                            {...field}
                                            error={fieldState.error ? true: false}
                                        >
                                            <MenuItem value={'COMIC'}>COMIC</MenuItem>
                                            <MenuItem value={'FICTION'}>FICTION</MenuItem>
                                            <MenuItem value={'ROMANTIC'}>ROMANTIC</MenuItem>
                                            <MenuItem value={'PROGRAMMING'}>PROGRAMMING</MenuItem>
                                        </Select>
                                        {fieldState.error && 
                                            <FormHelperText error>
                                                {fieldState.error?.message}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                )}
                            />
                            <TextField 
                                type="file"
                                {...register('photoUpload')}
                                onChange={(event) => handleFileUpload(event)}
                            />
                        </Stack>

                        <LoadingButton
                            type="submit"
                            variant="contained"
                            // disabled={!isValid}
                            loading={isSubmitting}
                        >Add Product</LoadingButton>
                    </form>
                </Grid>
                <Grid item xs={4} md={6}>
                    {image.preview && <img src={image.preview} alt="productImage"/>}
                </Grid>
            </Grid>
        </Container>
    );
}