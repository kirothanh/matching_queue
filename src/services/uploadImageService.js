import authorizedAxiosInstance from "../utils/authorizedAxios";

export const uploadImageCloudinary = async (data) => {
  const formData = new FormData();
  formData.append("imageBase64", data);

  const response = await authorizedAxiosInstance.post("/upload/cloudinary", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}