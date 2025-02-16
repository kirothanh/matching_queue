import { useRoutes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import { lazy, Suspense, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import Stadium from "./pages/admin/Stadium";
import WrappedRoute from "./routes/WrappedRoute";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./store/slices/userSlice";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import StadiumCreate from "./pages/admin/Stadium/StadiumCreate";
import Matching from "./pages/Matching";
import MatchingCreate from "./pages/Matching/MatchingCreate";
import Club from "./pages/Club";
import MatchingManage from "./pages/Matching/MatchingManage";
import Notifications from "./pages/Notifications";
import MatchingDetail from "./pages/Matching/MatchingDetail";
import Loading from "./components/Loading";
// import SuperAdminLayout from "./layouts/SuperAdminLayout";

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

export default function App() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);

  useEffect(() => {
    // Gọi API để lấy thông tin user khi ứng dụng load
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotification = notifications[notifications.length - 1];
      toast.info(lastNotification.data.title);
    }
  }, [notifications])

  const menu = [
    {
      path: "/admin",
      element: (
        <Suspense fallback={<Loading />} >
          <WrappedRoute element={<AdminLayout />} />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<DashboardAdmin />} />
            </Suspense>
          ),
        },
        {
          path: "stadium",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<Stadium />} />
            </Suspense>
          ),
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
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<Dashboard />} />
            </Suspense>
          ),
        },
        {
          path: "user-profile",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<UserProfile />} />
            </Suspense>
          ),
        },
        {
          path: "matching",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<Matching />} />
            </Suspense>
          ),
        },
        {
          path: "matching/create",
          element: <WrappedRoute element={<MatchingCreate />} />,
        },
        {
          path: "matching/manage-match",
          element: <WrappedRoute element={<MatchingManage />} />,
        },
        {
          path: "matching/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<MatchingDetail />} />
            </Suspense>
          ),
        },
        {
          path: "club/create",
          element: <WrappedRoute element={<Club />} />,
        },
        {
          path: "notifications",
          element: (
            <Suspense fallback={<Loading />}>
              <WrappedRoute element={<Notifications />} />
            </Suspense>
          ),
        },
      ]
    },
    {
      path: "/login", element: (
        <Suspense fallback={<Loading />}>
          <PublicRoute element={<LoginPage />} />
        </Suspense>
      ),
    },
    {
      path: "/register", element: (
        <Suspense fallback={<Loading />}>
          <PublicRoute element={<RegisterPage />} />
        </Suspense>
      ),
    },
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
