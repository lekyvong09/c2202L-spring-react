import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { fetchProductThunk, productAdapter } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";


export default function Catalog() { 
    const products = productAdapter.getSelectors().selectAll(store.getState().catalog);
    const {productLoad, status} = useSelector((state: any) => state.catalog);

    useEffect(() => {
        if (!productLoad) {
            store.dispatch(fetchProductThunk());
        }
    }, [productLoad]);

    if (status.includes('loading'))
        return <LoadingComponent />;

    return (
        <ProductList products={products} />
    );
}