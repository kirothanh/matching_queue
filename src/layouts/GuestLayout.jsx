/* eslint-disable react/prop-types */
// import Header from "./Header";
import Menu from "./Menu";

export default function GuestLayout({ children }) {
  return (
    <div className="flex relative">
      {/* <Header /> */}
      <Menu />
      <div className="w-full">{children}</div>
    </div>
  )
}
