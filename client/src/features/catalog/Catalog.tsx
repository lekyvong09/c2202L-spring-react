import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../model/product";

interface Props {
    bien1: Product[];
}

export default function Catalog({bien1}: Props) { /// properties

    return (
        <>
            <List>
                {bien1.length > 0 && bien1.map((product, index) => (
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