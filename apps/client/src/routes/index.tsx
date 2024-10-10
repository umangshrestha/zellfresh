import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';

import CartPage from '../components/Cart/CartPage';
import LoginPage from '../components/LoginPage';
import ProductPage from '../components/Product/ProductPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
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
