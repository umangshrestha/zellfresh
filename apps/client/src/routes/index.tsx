import { createBrowserRouter, Navigate } from 'react-router-dom';
import CartPage from '../components/Cart/CartPage';
import Layout from '../components/Layout';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import ProductPage from '../components/Product/ProductPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/products/:category',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/',
        element: <Navigate to="/products" />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
    ],
  },
]);
