import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../model/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { LoadingButton } from "@mui/lab";
import { store } from "../../store";
import { setBasketReducer } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard(props: Props) {
    const [loading, setLoading] = useState(false);

    const handleAddItem = (productId: number) => {
        setLoading(true);
        axios.post(`baskets?productId=${productId}&quantity=1`, {})
            .then((response: AxiosResponse) => store.dispatch(setBasketReducer(response.data)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader 
                sx={{height: 72.03}}
                avatar={
                    <Avatar sx={{backgroundColor: 'secondary.main'}}>
                        {props.product.category.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={props.product.name}
                titleTypographyProps={{sx: {color: 'primary.main', fontWeight: 'bold'} }}
            />
            <CardMedia
                sx={{ height: 380 }}
                image={`http://localhost:8080/api/file/image/${props.product.imageUrl}`}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    ${props.product.unitPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    size="small"
                    loading={loading}
                    onClick={() => handleAddItem(props.product.id)}
                >Add to cart</LoadingButton>
                <Button 
                    size="small"
                    component={Link}
                    to={`/catalog/${props.product.id}`}
                >View</Button>
            </CardActions>
            </Card>
    );
}