import { Product } from "../../model/product";
import ProductList from "./ProductList";


interface Props {
    products: Product[];
}

export default function Catalog(props: Props) { /// properties
    return (
        <ProductList products={props.products} />
    );
}