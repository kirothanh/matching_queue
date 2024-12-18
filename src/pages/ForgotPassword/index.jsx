import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

  const submitForgotPassword = async (data) => {
    try {
      const res = await authorizedAxiosInstance.post(`/auth/forgot-password`, data);

      if (res.data.status) {
        toast.success(res.data.message);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

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
            Quên mật khẩu ?
          </h1>
          <div className="w-full items-center space-y-3 sm:space-x-4 sm:space-y-0 sm:flex">
            <a href={`${import.meta.env.VITE_SERVER_API}/auth/google`} className="w-full">
              <button className="w-full inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200">
                <img
                  src="/img/google.svg"
                  alt="google logo"
                  className="w-5 h-5 mr-2"
                />
                Đăng nhập với Google
              </button>
            </a>
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <form
            onSubmit={handleSubmit(submitForgotPassword)}
            className="space-y-4 md:space-y-6"
          >
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
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="text"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full text-white bg-[#b5530a] hover:bg-[#b08351] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đặt lại password
              </button>
            </div>

            <p className="text-sm font-light text-gray-500 ">
              Tiếp tục đăng nhập?
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-[#d87706] hover:underline ml-[5px] cursor-pointer"
              >
                Đăng nhập ở đây
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
