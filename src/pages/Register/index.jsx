import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { localStorageSetup } from "../../utils/localStorageSetup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitRegister = async (data) => {
    try {
      const res = await authorizedAxiosInstance.post(
        `${import.meta.env.VITE_SERVER_API}/auth/register`,
        data
      );
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        localStorageSetup(res.data.data);
        toast.success("Đăng ký thành công!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        onClick={() => navigate("/")}
        className="flex items-center mb-6 text-3xl font-semibold text-gray-900 cursor-pointer"
      >
        <img
          src="/img/logo.svg"
          alt="Matching Queue"
          className="w-10 h-10 mr-2"
        />
        Matching Queue
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
            Tạo tài khoản tham gia cộng đồng bóng đá xung quanh bạn ngay
          </h1>
          <form
            onSubmit={handleSubmit(submitRegister)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                {...register("name", {
                  required: "Tên không được để trống",
                  minLength: {
                    value: 3,
                    message: "Tên phải có ít nhất 3 ký tự",
                  },
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không đúng định dạng",
                  },
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Số điện thoại không được để trống",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Số điện thoại phải có 10-11 chữ số",
                  },
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="text"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="text-sm">
                <label className="font-light text-gray-500">
                  Bằng cách đăng ký tài khoản tôi đồng ý với{" "}
                  <a
                    className="font-medium text-[#d28947] hover:underline"
                    href="/dieu-khoan-su-dung"
                  >
                    Điều khoản sử dụng của Matching Queue
                  </a>
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full text-white bg-[#d87706] hover:bg-[#b08351] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đăng ký
              </button>
            </div>

            <p className="text-sm font-light text-gray-500 ">
              Đã có tài khoản{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-[#d28947] hover:underline cursor-pointer"
              >
                Đăng nhập ở đây
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
