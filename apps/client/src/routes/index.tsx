import { createBrowserRouter } from 'react-router-dom';
import CartPage from '../components/Cart/CartPage';
import ErrorPage from '../components/ErrorBoundary/FrontendErrorPage';
import NotFoundPage from '../components/ErrorComponent/NotFoundPage';
import Layout from '../components/Layout';
import { PrivacyPolicy, TermsAndConditions } from '../components/Markdown';
import ProductPage from '../components/Product/ProductPage';
import ProfilePage from '../components/Profile/ProfilePage';
import CheckoutPage from '../pages/CheckoutPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import OrderPage from '../pages/OrderPage';

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
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/orders',
        element: <OrderPage />,
      },
      {
        path: '/terms-and-conditions',
        element: <TermsAndConditions />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
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
