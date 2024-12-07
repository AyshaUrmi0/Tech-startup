import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Components/Routers/router';
import './index.css';
import AuthProvider from './Components/provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <ToastContainer position='top-center'/>
  <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
);
