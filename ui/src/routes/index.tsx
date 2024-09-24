import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import LoginPage from "../pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/app",
        element: <p>Contact</p>,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);
