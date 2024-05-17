import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ProductPage from './features/product-crud/ProductPage';
import Header from './layout/Header';


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = (data: Product) => {
    setProducts((previousState) => [...previousState, {...data}]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      <Container>
        <ProductPage products={products} onAddProduct={addProduct}></ProductPage>
      </Container>
    </ThemeProvider>
  );
}

export default App;
