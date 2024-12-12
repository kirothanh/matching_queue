import { useRoutes } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";
import Dashboard from "./pages/Dashboard";
import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

export default function App() {
  const menu = [
    {
      path: "/",
      element: <PrivateRoute element={<Dashboard />} />,
    },
    { path: "/login", element: <PublicRoute element={<LoginPage />} /> },
    { path: "/register", element: <PublicRoute element={<RegisterPage />} /> },
  ];

  let element = useRoutes(menu);

  return element;
}
