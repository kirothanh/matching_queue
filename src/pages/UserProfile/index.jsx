import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/slices/userSlice";
import { FaUserCircle } from "react-icons/fa";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { data: userValue } = useSelector((state) => state.user.userValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = () => {
    setIsEditing(false);
  }

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  console.log("first", userValue);

  return (
    <div className="p-6 w-full ">
      <h2 className="text-2xl font-bold border-b-2 border-blue-500 inline-block pb-1">UserProfile</h2>

      <div className="mt-[20px] border max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <div className="mb-[20px] flex flex-col sm:flex-row items-center">
          {userValue?.avatar ? <img src={userValue?.avatar} alt="avatar" className="w-28 h-28 bg-gray-200 p-2 rounded-full" /> : <FaUserCircle className="w-28 h-28 bg-gray-200 p-2 rounded-full" />}

          <input type="file" accept="image/*" disabled={!isEditing} className={`mt-[20px] ml-4 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border file:border-blue-500 file:bg-blue-500 file:text-white
            hover:file:bg-blue-700 file:cursor-pointer ${!isEditing ? "opacity-50 cursor-not-allowed" : ""
            }`} />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Username</p>
          <input type="text" value={userValue?.name} disabled={!isEditing} className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"}`} />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Email</p>
          <input type="email" value={userValue?.email} disabled={!isEditing} className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"}`} />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Phone</p>
          <input type="text" value={userValue?.phone} disabled={!isEditing} className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"}`} />
        </div>
        <button
          onClick={handleEdit}
          disabled={isEditing}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isEditing ? "hidden" : ""
            }`}
        >
          Edit
        </button>

        {isEditing && (
          <div className="mt-4">
            <button
              onClick={handleSave}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className={`ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
