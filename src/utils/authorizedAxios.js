import axios from 'axios';
// import { toast } from 'react-toastify';
import { refreshTokenAPI } from '../api/index';

let authorizedAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
});
let isRefreshing = false;
let tokenListeners = [];

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Nếu như nhận mã 401 từ BE, thì sẽ gọi api logout luôn
    // if (error.response?.status === 401) {
    //   handleLogoutAPI().then(() => {

    //     location.href = '/login';
    //   });
    // }
    const refreshToken = localStorage.getItem("refreshToken");
    const shouldRenewToken = error.response?.status === 410 && refreshToken;

    if (error.config && error.config._retry) {
      return Promise.reject(error);
    }

    if (shouldRenewToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await refreshTokenAPI(refreshToken);
          const data = res.data.data;

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          tokenListeners.forEach((listener) => listener());
          tokenListeners = [];
          isRefreshing = false;

          error.config._retry = true;
          delete error.config.headers['Authorization'];
          return authorizedAxiosInstance(error.config);

        } catch (error) {
          isRefreshing = false;
          tokenListeners = [];
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } else {
        // Nếu đang refresh, các request khác chờ
        return new Promise((resolve) => {
          tokenListeners.push(() => {
            error.config._retry = true;
            delete error.config.headers['Authorization'];
            resolve(authorizedAxiosInstance(error.config));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
