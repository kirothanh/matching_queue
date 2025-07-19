/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import MenuAdmin from "./MenuAdmin";

export default function AdminLayout() {
  return (
    <div className="flex relative h-screen">
      <MenuAdmin />
      <div className="w-full p-8 overflow-y-auto"><Outlet /></div>
    </div>
  )
}
