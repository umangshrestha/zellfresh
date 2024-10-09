import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import { ThemeToggleProvider } from './components/ThemeToggle';
import { NotificationProvider } from './components/Notification';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    <ApolloProvider client={apolloClient}>
      <StrictMode>
        <ThemeToggleProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </ThemeToggleProvider>
      </StrictMode>
    </ApolloProvider>
  </GoogleOAuthProvider>,
);
