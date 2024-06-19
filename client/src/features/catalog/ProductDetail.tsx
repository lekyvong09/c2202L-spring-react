import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../model/product";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/basket";
import { store } from "../../store";
import { removeItemReducer, setBasketReducer } from "../basket/basketSlice";

export default function ProductDetail() {
    let params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(0);
    const {basket} = useSelector((state: any) => state.basket);
    const [submitting, setSubmitting] = useState(false);

    const basketItem = basket?.basketItems.find((i: BasketItem) => i.productId === product?.id);

    useEffect(() => {
        if (basketItem) {
            setQuantity(basketItem?.quantity);
        }

        axios.get(`products/${params.productId}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error));
    }, [basketItem, params.productId]);

    const handleInputChange = (event: any) => {
        if (event.target.value >=0) {
            setQuantity(event.target.value);
        }
    }

    const handleUpdateCart = () => {
        setSubmitting(true);
        if (!basketItem || quantity > basketItem?.quantity) {
            const updatedQuantity = basketItem ? quantity - basketItem.quantity : quantity;
            axios.post(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`, {})
                .then((response : AxiosResponse) => store.dispatch(setBasketReducer(response.data)))
                .catch(err => console.log(err))
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = basketItem.quantity - quantity;
            axios.delete(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`)
                .then(() => store.dispatch(removeItemReducer({productId: product?.id!, quantity: updatedQuantity})))
                .catch(err => console.log(err))
                .finally(() => setSubmitting(false));
        }
    }

    if (!product)
        return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <img 
                    src={`${process.env.REACT_APP_BASE_URL}file/image/${product?.imageUrl}`}
                    alt={`${product?.name}`}
                />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary' sx={{mb:4}}>${product?.unitPrice.toFixed(2)}</Typography>
                <Divider sx={{mb: 2}} />
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Author</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type="number"
                            label="Quantity"
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={quantity === basketItem?.quantity || (!basketItem && quantity === 0)}
                            loading={submitting}
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{height: '55px'}}
                            onClick={handleUpdateCart}
                        >
                            Update quantity
                        </LoadingButton>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
}