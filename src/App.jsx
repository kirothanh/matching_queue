import { useRoutes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
    {
      path: "/forgot-password",
      element: <PublicRoute element={<ForgotPassword />} />,
    },
    {
      path: "/reset-password",
      element: <PublicRoute element={<ResetPassword />} />,
    },
  ];

  let element = useRoutes(menu);

  return (
    <>
      {element}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
