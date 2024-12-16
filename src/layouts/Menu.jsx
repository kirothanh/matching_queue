import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidBellRing } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await authorizedAxiosInstance.post("/auth/logout")
    if (res.data.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } else {
      toast.error(res.data.message)
    }
  }

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-gray-50 border-gray-200 fixed top-0 left-0 z-40 w-64 lg:w-80 h-screen pb-16 sm:pb-10 pt-1 transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex grow flex-col px-3 py-4 bg-gray-50">
        <div className="flex items-center pl-2.5 mb-5">
          <img src="/img/logo.svg" alt="Logo" className="h-6 mr-3 sm:h-7" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Matching Queue
          </span>
        </div>
        <div className="flex flex-1 flex-col mt-3">
          <ul className="font-medium flex flex-1 flex-col gap-y-3">
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <FaHome className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Cộng đồng
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <AiFillThunderbolt className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Cáp kèo - Tìm đối
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <MdOutlineSignalCellularAlt className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Bảng xếp hạng
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <TbLayoutDashboardFilled className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Đặt sân
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <BiSolidBellRing className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Thông báo
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center p-2 rounded-full dark:text-white hover:bg-gray-100 group text-gray-900 font-semibold"
                href="#!"
              >
                <FaCircleUser className="flex-shrink-0 w-6 h-6 text-[#6b717e] transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3 text-[#6b717e] group-hover:text-gray-900 ">
                  Hồ sơ
                </span>
              </a>
            </li>
            <li className="p-2">
              <div className="flex text-xs text-gray-400 items-center justify-between">
                <span>Câu lạc bộ của bạn</span>
              </div>
              <ul className="-mx-2 mt-2 space-y-1">
                <li>
                  <a
                    href="#!"
                    className="flex items-center p-2 text-gray-500 rounded-full group hover:bg-gray-100"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-white text-gray-400 border-gray-200 group-hover:text-gray-900">
                      #
                    </span>
                    <span className="truncate text-gray-400 ml-2 group-hover:text-gray-900">
                      FC
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="flex flex-row items-center mt-auto pb-2">
              <a href="#!" className="w-full">
                <button className="flex p-2 text-gray-500 rounded-lg dark:text-white group hover:bg-gray-100 w-full">
                  <CiLogin className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span className="ml-3 whitespace-nowrap text-[#6b717e] group-hover:text-gray-900" onClick={handleLogout}>
                    Đăng xuất
                  </span>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
