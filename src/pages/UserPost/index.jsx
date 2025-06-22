import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser"
import { getArticlesByUserId } from "../../api";
import parse from "html-react-parser";

const UserPost = () => {
  const user = useCurrentUser();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await getArticlesByUserId(user.data?.id);
      setArticles(response.data);
    }

    getArticles();
  }, []);

  return (
    <>
      {
        articles?.data?.length > 0 ? (
          <div className="p-4 max-w-[1000px] mx-auto space-y-6">
            {articles?.data?.map((article) => (
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
                  {parse(article?.content)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Không có bài viết</div>
        )
      }
    </>
  )
}

export default UserPost