import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError<any>) => {

  switch (error.response?.status) {
    case 400:
      if (error.response?.data.message) {
        const errors = error.response?.data.message.split('; ').filter((message:string) => message !== '');
        throw errors;
      }

      toast.error(error.response?.data.message, {theme: 'colored'});
      break;

    default:
      toast.error(error.message, {theme: 'dark'});
      break;
  }

  console.log(error);
  return Promise.reject(error);
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
