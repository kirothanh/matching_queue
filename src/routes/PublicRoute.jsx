import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { authMiddleware } from "../utils/authMiddleware";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
export default function PublicRoute({ element }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLogin = authMiddleware();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin && (currentPath === "/login" || currentPath === "/register")) {
      navigate("/");
    }
  }, [isLogin, navigate, currentPath])

  return (
    <div>
      <AuthLayout>
        {element}
      </AuthLayout>
    </div>
  )
}
