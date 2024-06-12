import { useContext, useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";
import axios, { AxiosResponse } from "axios";


export default function BasketPage() {
    const {basket, setBasket, removeItem} = useContext(StoreContext);
    const [loading, setLoading] = useState(false);

    const handleAddItem = (productId: number) => {
        setLoading(true);
        axios.post(`baskets?productId=${productId}&quantity=1`, {})
            .then((response: AxiosResponse) => setBasket(response.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const handleRemoveItem = (productId: number, quantity: number) => {
        setLoading(true);
        axios.delete(`baskets?productId=${productId}&quantity=${quantity}`)
            .then(_ => removeItem(productId, quantity))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket?.basketItems.map(item => (
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
                            <TableCell align="center">
                                <LoadingButton 
                                    color="error"
                                    loading={loading}
                                    onClick={() => handleRemoveItem(item.productId, 1)}
                                >
                                    <RemoveCircle />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton 
                                    color="secondary"
                                    loading={loading}
                                    onClick={() => handleAddItem(item.productId)}
                                >
                                    <AddCircle />
                                </LoadingButton>
                            
                            </TableCell>
                            <TableCell>${(item.unitPrice*item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                                <LoadingButton 
                                    color="error"
                                    loading={loading}
                                    onClick={() => handleRemoveItem(item.productId, item.quantity)}
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}