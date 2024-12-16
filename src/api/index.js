import authorizedAxiosInstance from "../utils/authorizedAxios";

export const handleLogoutAPI = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const refreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.post(`${import.meta.env.VITE_SERVER_API}/auth/refresh_token`, { refreshToken })
}