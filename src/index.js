import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    transition={Flip}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    <App />
  </React.StrictMode>
);
