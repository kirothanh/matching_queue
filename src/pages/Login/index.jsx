import { useForm } from "react-hook-form";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";
import { localStorageSetup } from "../../utils/localStorageSetup";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      password: '',
    }
  });
  const navigate = useNavigate()

  const submitLogin = async (data) => {
    try {
      const res = await authorizedAxiosInstance.post(`/auth/login`, data);
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        console.log("first: ", res.data.data)
        localStorageSetup(res.data.data)
        toast.success("Đăng nhập thành công !")
        navigate("/")
      }
    } catch (error) {
      console.error("Login failed 123123: ", error.response?.data || error.message);
    }
  }

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:gap-20 lg:py-16 lg:grid-cols-12 h-screen">
      <div className="flex-col justify-between hidden col-span-6 mr-auto lg:flex xl:mb-0">
        <div>
          <a
            href="/"
            className="inline-flex items-center mb-6 text-2xl font-semibold text-gray-900 lg:mb-10"
          >
            <img
              src="/img/logo.svg"
              alt="Matching Queue"
              className="w-10 h-10 mr-2"
            />
            Matching Queue
          </a>
          <div className="flex">
            <IoIosCheckmarkCircle
              className="w-5 h-5 mr-2 text-primary-600 shrink-0 text-[#d67400]"
              fill="currentColor"
            />
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                Tìm sân nhanh chóng
              </h3>
              <p className="mb-2 font-light text-gray-500 ">
                Tìm sân bóng quanh bạn nhanh chóng
              </p>
            </div>
          </div>
          <div className="flex pt-8">
            <IoIosCheckmarkCircle
              className="w-5 h-5 mr-2 text-primary-600 shrink-0 text-[#d67400]"
              fill="currentColor"
            />
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                Tìm đối thủ phù hợp
              </h3>
              <p className="mb-2 font-light text-gray-500 ">
                Tìm ra ngay kèo hay đối phù hợp trình độ uy tín
              </p>
            </div>
          </div>
          <div className="flex pt-8">
            <IoIosCheckmarkCircle
              className="w-5 h-5 mr-2 text-primary-600 shrink-0 text-[#d67400]"
              fill="currentColor"
            />
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 ">
                Tìm câu lạc bộ để tham gia
              </h3>
              <p className="mb-2 font-light text-gray-500 ">
                Hàng trăm clb uy tín chờ bạn vào chơi
              </p>
            </div>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#!"
                className="text-sm text-gray-500 hover:underline hover:text-gray-900"
              >
                Về chúng tôi
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="text-sm text-gray-500 hover:underline hover:text-gray-900"
              >
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="text-sm text-gray-500 hover:underline hover:text-gray-900"
              >
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mb-6 text-center lg:hidden">
        <a
          href="#!"
          className="inline-flex items-center text-2xl font-semibold text-gray-900 lg:hidden"
        >
          <img
            src="/img/logo.svg"
            alt="Matching Queue"
            className="w-10 h-10 mr-2"
          />
          Matching Queue
        </a>
      </div>
      <div className="w-full col-span-6 mx-auto bg-white rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
        <div className="p-6 space-y-4 lg:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
            Chào mừng quay trở lại
          </h1>
          <div className="flex items-center">
            <div className="w-full h-0.5 bg-gray-200"></div>
            <div className="px-5 text-center text-gray-500">or</div>
            <div className="w-full h-0.5 bg-gray-200"></div>
          </div>
          <form onSubmit={handleSubmit(submitLogin)} className="space-y-4 lg:space-y-6">
            <div>
              <label
                htmlFor="user_email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                className={`bg-gray-50 border-2 outline-none text-gray-900 rounded-lg block w-full p-2.5 ${errors.email ? "border-red-500" : "border-gray-300 focus:border-[#b37f45]"
                  }`}
                placeholder="Email"
                id="user_email"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không đúng định dạng",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label
                htmlFor="user_password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                className={`bg-gray-50 border-2 outline-none text-gray-900 rounded-lg block w-full p-2.5 ${errors.password ? "border-red-500" : "border-gray-300 focus:border-[#b37f45]"
                  }`}
                placeholder="••••••••"
                id="user_password"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5 ">
                  <input name="user[remember_me]" type="hidden" value="0" />
                  <input
                    className="text-[#b67e3a] w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-[#b37f45] focus:ring-[#b37f45] checked:bg-[#b37f45] cursor-pointer"
                    // required="required"
                    type="checkbox"
                    value="1"
                    name="user[remember_me]"
                    id="user_remember_me"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="user_remember_me"
                    className="text-gray-500 dark:text-gray-300 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#b67e3a] hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#d87706] hover:bg-[#b08351] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng nhập
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Chưa có tài khoản?
              <a
                href="/register"
                className="font-medium text-[#d87706] hover:underline ml-[5px]"
              >
                Đăng ký ở đây
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
