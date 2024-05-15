import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import Catalog from './features/catalog/Catalog';
import { Typography } from '@mui/material';
import ProductForm from './features/product-crud/ProductForm';


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <Typography variant='h3'>My Shop</Typography>
      <ProductForm />
      <Catalog bien1={products} ></Catalog>
    </div>
  );
}

export default App;
