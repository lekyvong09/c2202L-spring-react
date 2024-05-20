import { useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ProductPage from './features/product-crud/ProductPage';
import Header from './layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import Catalog from './features/catalog/Catalog';
import ProductDetail from './features/catalog/ProductDetail';
import AboutPage from './features/about/AboutPage';
import ContactPage from './features/contact/ContactPage';


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
      <Header darkMode={darkMode} onSetDarkMode={setDarkMode}></Header>
      <Container>

        <Routes>
          <Route path='/' element={<HomePage />}  />
          <Route path='catalog' element={<Catalog />}  />
          <Route path='catalog/:productId' element={<ProductDetail />}  />
          <Route path='about' element={<AboutPage />}  />
          <Route path='contact' element={<ContactPage />}  />
          <Route path='manage-product' element={<ProductPage products={products} onAddProduct={addProduct} />} />
        </Routes>

      </Container>
    </ThemeProvider>
  );
}

export default App;
