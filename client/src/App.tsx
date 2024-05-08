import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import Catalog from './features/catalog/Catalog';

const initialProducts: Product[] = [];

function App() {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <Catalog bien1={products} ></Catalog>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - price: {product.unitPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
