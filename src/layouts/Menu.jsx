import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidBellRing } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const MenuItems = [
  { name: "Cộng đồng", icon: FaHome, path: "/" },
  { name: "Cáp kèo - Tìm đối", icon: AiFillThunderbolt, path: "/matching" },
  { name: "Tạo Đội bóng", icon: MdPeople, path: "/club/create" },
  // { name: "Bảng xếp hạng", icon: MdOutlineSignalCellularAlt, path: "/profile" },
  { name: "Thông báo", icon: BiSolidBellRing, path: "/notifications" },
  { name: "Hồ sơ", icon: FaCircleUser, path: "/user-profile" },
];

export default function Menu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const res = await authorizedAxiosInstance.delete("/auth/logout");
    if (res.data.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div
        className={`lg:flex flex-col gap-y-5 overflow-y-auto border-r bg-gray-50 border-gray-200 z-40 w-64 lg:w-80 h-screen pb-16 sm:pb-10 pt-1 transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } fixed lg:relative`}
      >
        <div className="mt-[20px] flex grow flex-col px-3 py-4 bg-gray-50">
          <div
            className="flex items-center pl-2.5 mb-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/img/logo.svg" alt="Logo" className="h-6 mr-3 sm:h-7" />
            <span className="self-center text-xl font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#346ecf] to-[#0c2b6a]">Matching Queue</span>
          </div>

          <ul className="font-medium flex flex-1 flex-col gap-y-3">
            {MenuItems.map((item, index) => (
              <li key={index}>
                <a
                  className={`flex items-center p-2 rounded-full group hover:bg-gray-100 font-semibold cursor-pointer transition duration-300 ${pathname === item.path
                    ? "bg-[#dbeaff] text-[#346ecf]"
                    : "text-[#6b717e]"
                    } "
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon
                    className={`flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-900 ${pathname === item.path
                      ? "text-[#346ecf]"
                      : "text-[#6b717e]"
                      }`}
                  />
                  <span className="ml-3 group-hover:text-gray-900">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}

            <li className="flex flex-row items-center mt-auto pb-2">
              <button
                className="flex p-2 text-gray-500 rounded-lg group hover:bg-gray-100 w-full"
                onClick={handleLogout}
              >
                <CiLogin className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 whitespace-nowrap text-[#6b717e] group-hover:text-gray-900">
                  Đăng xuất
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="block lg:hidden p-3 absolute right-0">
        {menuOpen ? (
          <IoIosClose
            className="inline-block lg:hidden w-9 h-9 p-1 mt-[10px] cursor-pointer text-lg hover:text-[#346ecf] bg-[#dbeaff] rounded-full"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <IoMenu
            className="inline-block lg:hidden w-9 h-9 p-1 mt-[10px] cursor-pointer text-lg hover:text-[#346ecf] bg-[#dbeaff] rounded-full"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
    </>
  );
}
