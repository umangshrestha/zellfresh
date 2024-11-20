import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import OrderPage from '../pages/OrderPage';
import OrderPlacedPage from '../pages/OrdersPage/OrderPlacedPage';
import ProductPage from '../pages/ProductPage';
import ProfilePage from '../pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/cart/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
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
      {
        path: '/orders',
        element: <OrderPage />,
      },
      {
        path: '/orders/placed/:orderId',
        element: <OrderPlacedPage />,
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
