import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AccountProvider } from './components/Account/Account.provider.tsx';
import { NotificationProvider } from './components/Notification';
import { ThemeToggleProvider } from './components/ThemeToggle';
import './index.css';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    <StrictMode>
      <ThemeToggleProvider>
        <NotificationProvider>
          <AccountProvider>
            <RouterProvider router={router} />
          </AccountProvider>
        </NotificationProvider>
      </ThemeToggleProvider>
    </StrictMode>
  </GoogleOAuthProvider>,
);
