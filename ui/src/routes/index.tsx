import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import LoginPage from "../pages/auth/login";
import Products from "../pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
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
