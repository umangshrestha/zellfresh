import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo";
import { ThemeModeProvider } from "./components/ThemeToggle/provider";
import { NotificationProvider } from "./components/Notification/provider";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    <ApolloProvider client={apolloClient}>
      <StrictMode>
        <ThemeModeProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </ThemeModeProvider>
      </StrictMode>
    </ApolloProvider>
  </GoogleOAuthProvider>,
);
