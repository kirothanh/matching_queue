import authorizedAxiosInstance from "../utils/authorizedAxios"


export const getArticles = async () => {
  const response = await authorizedAxiosInstance.get("/article");
  return response.data;
}

export const postArticle = async (htmlContent) => {
  const response = await authorizedAxiosInstance.post("/article", {
    content: htmlContent,
  });
  return response.data;
};