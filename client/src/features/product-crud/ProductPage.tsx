import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/product";
import ProductForm from "./ProductForm";

interface Props {
    products: Product[];
    onAddProduct: (data: Product) => void;
}

export default function ProductPage({products, onAddProduct}: Props) {
    return (
        <>
            <ProductForm onAddProduct={onAddProduct}></ProductForm>
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