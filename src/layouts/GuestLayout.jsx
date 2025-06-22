/* eslint-disable react/prop-types */
// import Header from "./Header";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

export default function GuestLayout() {
  return (
    <div className="flex relative h-screen">
      <Menu />
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
