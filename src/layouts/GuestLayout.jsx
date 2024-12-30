/* eslint-disable react/prop-types */
// import Header from "./Header";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

export default function GuestLayout() {
  return (
    <div className="flex relative">
      <Menu />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
