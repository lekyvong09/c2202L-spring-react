import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/product";
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";


export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('products')
            .then((response: AxiosResponse) => setProducts(response.data))
    }, []);
    
    const addProduct = (data: Product) => {
        setProducts((previousState) => [...previousState, {...data}]);
    }

    return (
        <>
            <ProductForm onAddProduct={addProduct}></ProductForm>
            <List>
                {products.length > 0 && products.map((product, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={`http://localhost:8080/api/file/image/${product.imageUrl}`}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            {product.name} - price: {product.unitPrice}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
}