/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import MenuAdmin from "./MenuAdmin";

export default function AdminLayout() {
  return (
    <div className="flex relative">
      <MenuAdmin />
      <div className="w-full p-8"><Outlet /></div>
    </div>
  )
}
