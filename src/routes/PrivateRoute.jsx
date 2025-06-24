import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import GuestLayout from "../layouts/GuestLayout";
import { authMiddleware } from "../utils/authMiddleware";
import { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

const renderLayout = (role, element) => {
  switch (role) {
    case "admin":
      return <AdminLayout>{element}</AdminLayout>;
    case 0:
      return <SuperAdminLayout>{element}</SuperAdminLayout>;
    default:
      return <GuestLayout>{element}</GuestLayout>;
  }
};

/* eslint-disable react/prop-types */
export default function PrivateRoute({ element }) {
  const user = useCurrentUser();
  const role = user?.data?.role;
  const isLogin = authMiddleware();
  // const expiredLogin = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return isLogin ? (
    <div>{renderLayout(role, element)}</div>
  ) : null;
}
