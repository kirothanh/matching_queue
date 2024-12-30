import { useRoutes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import { lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import Stadium from "./pages/admin/Stadium";
import WrappedRoute from "./routes/WrappedRoute";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./store/slices/userSlice";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import StadiumCreate from "./pages/admin/Stadium/StadiumCreate";
// import SuperAdminLayout from "./layouts/SuperAdminLayout";

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi API để lấy thông tin user khi ứng dụng load
    dispatch(getUserProfile());
  }, [dispatch]);

  const menu = [
    {
      path: "/admin",
      element: <WrappedRoute element={<AdminLayout />} />,
      children: [
        {
          path: "",
          element: <WrappedRoute element={<DashboardAdmin />} />,
        },
        {
          path: "stadium",
          element: <WrappedRoute element={<Stadium />} />,
        },
        {
          path: "stadium/create",
          element: <WrappedRoute element={<StadiumCreate />} />,
        },
        {
          path: "stadium/edit/:id",
          element: <WrappedRoute element={<StadiumCreate />} />,
        }
      ],
    },
    {
      path: "/",
      element: <WrappedRoute element={<GuestLayout />} />,
      children: [
        {
          path: "",
          element: <WrappedRoute element={<Dashboard />} />,
        },
        {
          path: "user-profile",
          element: <WrappedRoute element={<UserProfile />} />,
        },
      ]
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
