import { useEffect, useState } from "react";
import { Product } from "../../model/product";
import ProductList from "./ProductList";
import axios, { AxiosResponse } from "axios";


export default function Catalog() { /// properties
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('products')
            .then((response: AxiosResponse) => setProducts(response.data))
    }, []);

    return (
        <ProductList products={products} />
    );
}