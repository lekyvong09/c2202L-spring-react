import { useEffect, useState } from "react";
import { Product } from "../../model/product";
import ProductList from "./ProductList";
import axios, { AxiosResponse } from "axios";
import LoadingComponent from "../../layout/LoadingComponent";


export default function Catalog() { /// properties
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('products')
            .then((response: AxiosResponse) => setProducts(response.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <LoadingComponent />;

    return (
        <ProductList products={products} />
    );
}