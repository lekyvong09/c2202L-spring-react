import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk } from "./basketSlice";
import { BasketItem } from "../../model/basket";


export default function BasketPage() {
    const {basket, status} = useSelector((state: any) => state.basket);

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="center" width={200}>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket?.basketItems.map((item: BasketItem) => (
                        <TableRow key={item.productId}>
                            <TableCell>
                                <Box display='flex' alignItems='center'>
                                    <img 
                                        src={`${process.env.REACT_APP_BASE_URL}file/image/${item.imageUrl}`} 
                                        alt=""
                                        style={{height: 50, marginRight: 20}}/>
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell>${(item.unitPrice).toFixed(2)}</TableCell>
                            <TableCell align="center"  width={200}>
                                <LoadingButton 
                                    color="error"
                                    loading={status === 'loadingRemoveItem' + item.productId + 'rem'}
                                    onClick={() => store.dispatch(removeBasketItemThunk({productId:item.productId, quantity: 1, name: 'rem'}))}
                                >
                                    <RemoveCircle />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton 
                                    color="secondary"
                                    loading={status === 'loadingAddItem' + item.productId}
                                    onClick={() => store.dispatch(addBasketItemThunk({productId:item.productId}))}
                                >
                                    <AddCircle />
                                </LoadingButton>
                            
                            </TableCell>
                            <TableCell>${(item.unitPrice*item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                                <LoadingButton 
                                    color="error"
                                    loading={status === 'loadingRemoveItem' + item.productId + 'del'}
                                    onClick={() => store.dispatch(removeBasketItemThunk({productId: item.productId, quantity: item.quantity, name: 'del'}))}
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <BasketSummary />
                <Button
                    component={Link}
                    to='/checkout'
                    variant="contained"
                    size="large"
                    fullWidth
                >Checkout</Button>
            </Grid>
        </Grid>
    </>
    );
}