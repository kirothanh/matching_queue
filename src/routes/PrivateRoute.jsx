import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import GuestLayout from "../layouts/GuestLayout";

const renderLayout = (role, element) => {
  switch (role) {
    case "admin":
      return <AdminLayout>{element}</AdminLayout>;
    case "superadmin":
      return <SuperAdminLayout>{element}</SuperAdminLayout>;
    default:
      return <GuestLayout>{element}</GuestLayout>;
  }
};

/* eslint-disable react/prop-types */
export default function PrivateRoute({ element }) {
  const role = "user";
  const isLogin = true;
  // const expiredLogin = false;
  const navigate = useNavigate();

  return isLogin ? (
    <div>{renderLayout(role, element)}</div>
  ) : (
    navigate.redirect("/login")
  );
}
