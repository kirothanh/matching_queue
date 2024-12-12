export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="/"
        className="flex items-center mb-6 text-3xl font-semibold text-gray-900"
      >
        <img src="/img/logo.svg" alt="Sporta" className="w-10 h-10 mr-2" />
        Sporta
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-base font-semibold text-center text-gray-900 md:text-2xl">
            Tạo tài khoản tham gia cộng đồng bóng đá xung quanh bạn ngay
          </h1>
          <form action="" className="space-y-4 md:space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="user_email"
              >
                Email
              </label>
              <input
                required="required"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-[#b67d3f] focus:border-[#b67d3f] block w-full p-2.5"
                type="email"
                value=""
                name="user_email"
                id="user_email"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="user_password"
              >
                Mật khẩu
              </label>
              <input
                required="required"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-[#b67d3f] focus:border-[#b67d3f] block w-full p-2.5"
                type="password"
                value=""
                name="user_password"
                id="user_password"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="user_password_confirmation"
              >
                Xác nhận mật khẩu
              </label>
              <input
                required="required"
                className="bg-gray-50 border-2 border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-[#b67d3f] focus:border-[#b67d3f] block w-full p-2.5"
                type="password"
                value=""
                name="user_password_confirmation"
                id="user_password_confirmation"
              />
            </div>
            <div className="flex items-start">
              <div className="text-sm">
                <label className="font-light text-gray-500">
                  Bằng cách đăng ký tài khoản tôi đồng ý với{" "}
                  <a
                    className="font-medium text-[#d28947] hover:underline"
                    href="/dieu-khoan-su-dung"
                  >
                    Điều khoản sử dụng của Sporta
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
          </form>
          <p className="text-sm font-light text-gray-500 ">
            Đã có tài khoản{" "}
            <a
              href="/login"
              className="font-medium text-[#d87706] hover:underline "
            >
              Đăng nhập ở đây
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
