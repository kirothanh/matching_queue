import authorizedAxiosInstance from "../utils/authorizedAxios";

export const handleLogoutAPI = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo');

  return await authorizedAxiosInstance.delete(`${import.meta.env.VITE_SERVER_API}/auth/logout`)
}

export const refreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.put(`${import.meta.env.VITE_SERVER_API}/auth/refresh_token`, { refreshToken })
}