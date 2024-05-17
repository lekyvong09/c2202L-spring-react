import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import { Typography } from '@mui/material';
import ProductPage from './features/product-crud/ProductPage';


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = (data: Product) => {
    setProducts((previousState) => [...previousState, {...data}]);
  }

  return (
    <div>
      <Typography variant='h3'>My Shop</Typography>
      <ProductPage products={products} onAddProduct={addProduct}></ProductPage>
    </div>
  );
}

export default App;
