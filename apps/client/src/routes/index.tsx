import { createBrowserRouter } from 'react-router-dom';
import CartPage from '../components/Cart/CartPage';
import CheckoutPage from '../components/Checkout/CheckoutPage';
import ErrorPage from '../components/ErrorBoundary/FrontendErrorPage';
import NotFoundPage from '../components/ErrorComponent/NotFoundPage';
import HomePage from '../components/HomePage';
import Layout from '../components/Layout';
import { AdminLayout } from '../components/Layout/AdminLayout.tsx';
import LoginPage from '../components/LoginPage';
import { PrivacyPolicy, TermsAndConditions } from '../components/Markdown';
import OrdersAdminPage from '../components/Order/OrdersAdminPage';
import OrdersPage from '../components/Order/OrdersPage';
import ProductsPage from '../components/Product/ProductsPage';
import ProfilePage from '../components/Profile/ProfilePage';

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
        element: <ProductsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/terms-and-conditions',
        element: <TermsAndConditions />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin/orders',
            element: <OrdersAdminPage />,
          },
        ],
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
