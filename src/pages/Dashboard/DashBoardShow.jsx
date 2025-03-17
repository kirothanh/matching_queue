import { useEffect, useState } from "react";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import parse from "html-react-parser";

const DashBoardShow = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await authorizedAxiosInstance.get("/article");
        const data = response.data.data;
        console.log("data: ", data);
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="p-4 max-w-[1000px] mx-auto space-y-6 max-h-screen overflow-y-scroll">
      {articles.map((article) => (
        <div
          key={article.id}
          className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 w-full"
        >
          {/* Header */}
          <div className="flex items-center space-x-4">
            <img
              src={article?.user?.avatar || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-sm font-semibold">{article?.user?.name || "Unknown"}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="mt-3 text-sm text-gray-700 leading-relaxed">
            {parse(article.content)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoardShow;
