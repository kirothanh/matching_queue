import axios from "axios";
import authorizedAxiosInstance from "../utils/authorizedAxios";

export const handleLogoutAPI = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo');

  return await authorizedAxiosInstance.delete(`${import.meta.env.VITE_SERVER_API}/auth/logout`)
}

export const refreshTokenAPI = async (refreshToken) => {
  return await axios.post(`${import.meta.env.VITE_SERVER_API}/auth/refresh_token`, { refreshToken })
}

export const getClubsByUserId = async (id) => {
  const url = `/club`;
  return await authorizedAxiosInstance.get(url, { params: { id } });
}

export const joinMatch = async (id, partner_id, club_id) => {
  const url = `/matches/join`;
  return await authorizedAxiosInstance.post(url, { id, partner_id, club_id });
}

export const getArticlesByUserId = async (id) => {
  const url = `/article/${id}`;
  return await authorizedAxiosInstance.get(url);
}

export const getUsers = async () => {
  const url = `/admin/users`;
  return await authorizedAxiosInstance.get(url);
}

export const getUserById = async (id) => {
  const url = `/admin/users/${id}`;
  return await authorizedAxiosInstance.get(url);
}

export const createUser = async (data) => {
  const url = `/admin/users`;
  return await authorizedAxiosInstance.post(url, data);
}

export const updateUser = async (id, data) => {
  const url = `/admin/users/${id}`;
  return await authorizedAxiosInstance.patch(url, data);
}

export const uploadImage = async (data) => {
  const url = `/upload/cloudinary`;
  return await authorizedAxiosInstance.post(url, { imageBase64: data });
}