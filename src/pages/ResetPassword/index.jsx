import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";


export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const submitResetPassword = async (data) => {
    const { password } = data;
    const res = await authorizedAxiosInstance.post('/auth/reset-password', { password, token });
    if (res.data.status) {
      toast.success(res.data.message);
      navigate('/login');
    } else {
      toast.error(res.data.message);
    }
  }

  const password = watch("password");

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
            Thay đổi mật khẩu
          </h1>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <form
            onSubmit={handleSubmit(submitResetPassword)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mật khẩu mới
              </label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.name
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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Xác nhận mật khẩu
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Xác nhận mật khẩu không được để trống",
                  validate: (value) =>
                    value === password || "Mật khẩu không khớp",
                })}
                className={`bg-gray-50 border-2 text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 ${errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#b67d3f]"
                  }`}
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full text-white bg-[#b5530a] hover:bg-[#b08351] font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase"
              >
                Thay đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
