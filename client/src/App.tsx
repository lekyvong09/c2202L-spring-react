import { useState } from 'react';
import './App.css';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ProductPage from './features/product-crud/ProductPage';
import Header from './layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import Catalog from './features/catalog/Catalog';
import ProductDetail from './features/catalog/ProductDetail';
import AboutPage from './features/about/AboutPage';
import ContactPage from './features/contact/ContactPage';
import { ToastContainer } from 'react-toastify';
import ServerError from './features/error/ServerError';
import { AxiosInterceptor } from './interceptor/AxiosInterceptor';
import NotFound from './features/error/NotFound';


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  });


  return (
    <AxiosInterceptor>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} onSetDarkMode={setDarkMode}></Header>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />}  />
            <Route path='catalog' element={<Catalog />}  />
            <Route path='catalog/:productId' element={<ProductDetail />}  />
            <Route path='about' element={<AboutPage />}  />
            <Route path='contact' element={<ContactPage />}  />
            <Route path='manage-product' element={<ProductPage />} />
            <Route path='server-error' element={<ServerError />} />
            <Route path='not-found' element={<NotFound />} />
          </Routes>

        </Container>
      </ThemeProvider>
    </AxiosInterceptor>
  );
}

export default App;
