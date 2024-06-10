import { useContext, useEffect, useState } from 'react';
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
import BasketPage from './features/basket/BasketPage';
import { getCookie } from './util/util';
import axios, { AxiosResponse } from 'axios';
import { StoreContext } from './context/StoreContext';
import LoadingComponent from './layout/LoadingComponent';


function App() {
  const {setBasket} = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>();

  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  });


  useEffect(() => {
    const buyerId = getCookie('buyerId');
    console.log(buyerId);
    if (buyerId) {
      axios.get('baskets')
        .then((response: AxiosResponse) => setBasket(response.data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);


  if (loading) {
    return <LoadingComponent />
  }


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
            <Route path='basket' element={<BasketPage />}  />
            <Route path='about' element={<AboutPage />}  />
            <Route path='contact' element={<ContactPage />}  />
            <Route path='manage-product' element={<ProductPage />} />
            <Route path='server-error' element={<ServerError />} />
            <Route path='not-found' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Container>
      </ThemeProvider>
    </AxiosInterceptor>
  );
}

export default App;
