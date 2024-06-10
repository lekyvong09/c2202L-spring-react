import { useContext } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";


export default function BasketPage() {
    const {basket} = useContext(StoreContext);

    console.log(basket);
    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket?.basketItems.map(item => (
                        <TableRow key={item.productId}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>${(item.unitPrice).toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${(item.unitPrice*item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}