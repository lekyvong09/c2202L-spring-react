import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../model/product";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
}

export default function ProductCard(props: Props) {
    // console.log(props.product);

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
                <Button size="small">Add to cart</Button>
                <Button 
                    size="small"
                    component={Link}
                    to={`/catalog/${props.product.id}`}
                >View</Button>
            </CardActions>
            </Card>
    );
}