import { createBrowserRouter, Navigate } from 'react-router-dom';
import CartPage from '../components/Cart/CartPage';
import CheckoutPage from '../components/CheckoutPage';
import Layout from '../components/Layout';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import ProductPage from '../components/Product/ProductPage';
import ProfilePage from '../components/Profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/products" />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/products/:category',
        element: <ProductPage />,
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
