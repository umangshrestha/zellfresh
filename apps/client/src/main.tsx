import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CartCountProvider } from './components/Cart/hooks/CartCount';
import { NotificationProvider } from './components/Notification';
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
            <CartCountProvider>
              <RouterProvider router={router} />
            </CartCountProvider>
          </NotificationProvider>
        </ThemeToggleProvider>
      </StrictMode>
    </ApolloProvider>
  </GoogleOAuthProvider>,
);
