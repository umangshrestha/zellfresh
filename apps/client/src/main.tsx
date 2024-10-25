import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CartIconProvider } from './components/Cart/CartIcon';
import { NotificationProvider } from './components/Notification';
import { ProductFilterProvider } from './components/Product/ProductFilter/ProductFilter.provider';
import { ThemeToggleProvider } from './components/ThemeToggle';
import './index.css';
import { apolloClient } from './lib/apollo';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    <ApolloProvider client={apolloClient}>
      <StrictMode>
        <ThemeToggleProvider>
          <NotificationProvider>
            <CartIconProvider>
              <ProductFilterProvider>
                <RouterProvider router={router} />
              </ProductFilterProvider>
            </CartIconProvider>
          </NotificationProvider>
        </ThemeToggleProvider>
      </StrictMode>
    </ApolloProvider>
  </GoogleOAuthProvider>,
);
