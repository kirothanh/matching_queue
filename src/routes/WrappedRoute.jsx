import { useLocation, useNavigate } from "react-router-dom";
import { authMiddleware } from "../utils/authMiddleware";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export default function WrappedRoute({ element }) {
  const { data: userValue } = useSelector((state) => state?.user?.userValue);
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
      const role = +userValue?.role;

      if (role === 1 && !location.pathname.startsWith("/admin")) {
        navigate("/admin");
      } else if (role === 2 && location.pathname.startsWith("/admin")) {
        navigate("/");
      }
    }
  }, [isLogin, userValue?.role, location.pathname, navigate]);

  return isLogin ? (
    <div>{element}</div>
  ) : null;
}
