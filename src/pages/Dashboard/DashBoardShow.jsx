import { useEffect, useState } from "react";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import parse from "html-react-parser";

const DashBoardShow = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching articles...');
        const response = await authorizedAxiosInstance.get("/article");
        console.log('Articles response: ', response);
        const data = response.data.data;
        console.log("Articles data: ", data);

        // Sắp xếp articles theo ngày tạo mới nhất lên đầu
        const sortedArticles = data.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || 0);
          const dateB = new Date(b.createdAt || b.created_at || 0);
          return dateB - dateA; // Sắp xếp giảm dần (mới nhất lên đầu)
        });

        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        console.error("Error details:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          url: error.config?.url
        });
        setError(error.response?.data?.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);
  console.log('articles: ', articles);

  if (loading) {
    return (
      <div className="p-4 max-w-[1000px] mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-[1000px] mx-auto space-y-6">
      {articles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No articles found.</p>
        </div>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 w-full"
          >
            {/* Header */}
            <div className="flex items-center space-x-4">
              <img
                src={article?.user?.avatar || "/img/avatar.png"}
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
        ))
      )}
    </div>
  );
};

export default DashBoardShow;
