/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeaderTitle = ({ title, id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-end gap-x-2">
        <div
          className="bg-gray-100 p-1 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-400"
          onClick={() => navigate(-1)}
        >
          <MdKeyboardArrowLeft className="text-xl" />
        </div>
        <h2 className="font-bold text-2xl">{id ? `Chỉnh sửa ${title}` : `Tạo ${title} mới`}</h2>
      </div>
    </div>
  )
}

export default HeaderTitle