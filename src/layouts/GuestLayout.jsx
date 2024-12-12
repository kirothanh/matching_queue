/* eslint-disable react/prop-types */
// import Header from "./Header";
import Menu from "./Menu";

export default function GuestLayout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <Menu />
      <div>{children}</div>
    </>
  )
}
