import { useLocation, useNavigate } from "react-router-dom";
import { authMiddleware } from "../utils/authMiddleware";
import { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

/* eslint-disable react/prop-types */
export default function WrappedRoute({ element }) {
  const user = useCurrentUser();
  const isLogin = authMiddleware();
  const navigate = useNavigate();
  const location = useLocation();

  // if (loading) {
  //   return <Loading />;
  // }

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      const role = +user?.data?.role;

      if (role === 1 && !location.pathname.startsWith("/admin")) {
        navigate("/admin");
      } else if (role === 2 && location.pathname.startsWith("/admin")) {
        navigate("/");
      }
    }
  }, [isLogin, user?.data?.role, location.pathname, navigate]);

  return isLogin ? (
    <div>{element}</div>
  ) : null;
}
