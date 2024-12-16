import axios from 'axios';
import { toast } from 'react-toastify';
import { handleLogoutAPI, refreshTokenAPI } from '../api/index';

let authorizedAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
});
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

// Khởi tạo 1 cái promise cho việc gọi api refresh_token
let refreshTokenPromise = null;

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Nếu như nhận mã 401 từ BE, thì sẽ gọi api logout luôn
    if (error.response?.status === 401) {
      handleLogoutAPI().then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // location.href = '/login';
      });
    }

    // Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
    const originalRequest = error.config;
    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        // Lấy refreshToken từ localStorage
        const refreshToken = localStorage.getItem('refreshToken');

        // Gọi api refresh token
        refreshTokenPromise = refreshTokenAPI(refreshToken)
          .then((res) => {
            // Lấy và gán lại accessToken vào localStorage
            const { accessToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          })
          .catch((_error) => {
            handleLogoutAPI().then(() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              location.href = '/login';
            });

            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      // Cuối cùng mới return cái refreshTokenPromise trong trường hợp success
      return refreshTokenPromise.then(() => {
        return authorizedAxiosInstance(originalRequest);
      });
    }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
