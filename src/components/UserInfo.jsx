import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile } from "../store/slices/userSlice";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import useCurrentUser from "../hooks/useCurrentUser";

export default function UserInfo() {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user?.data) {
      setUpdatedUser({
        name: user?.data.name,
        email: user?.data.email,
        phone: user?.data.phone,
      });
    }
  }, [user?.data]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser({
      name: user?.data.name,
      email: user?.data.email,
      phone: user?.data.phone,
    });
    setNewAvatarFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang mặc định của form
    const formData = new FormData();

    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    formData.append("phone", updatedUser.phone);

    const avatarKey = user?.data?.avatar ? user?.data.avatar.split("/").pop() : null;
    if (newAvatarFile) {
      formData.append("avatar", newAvatarFile);
      formData.append("oldKey", avatarKey);
    }

    try {
      const response = await authorizedAxiosInstance.post("/profile/update", formData);
      console.log("res: ", response.data);
      dispatch(getUserProfile());

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="border max-w-5xl p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-[20px] flex flex-col sm:flex-row items-center">
          {user?.data?.avatar ? (
            <img
              src={user?.data?.avatar}
              alt="avatar"
              className="w-28 h-28 bg-gray-200 p-2 rounded-full"
            />
          ) : (
            <FaUserCircle className="w-28 h-28 bg-gray-200 p-2 rounded-full" />
          )}

          <input
            type="file"
            accept="image/*"
            disabled={!isEditing}
            className={`mt-[20px] ml-4 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border file:border-blue-500 file:bg-blue-500 file:text-white hover:file:bg-blue-700 file:cursor-pointer ${!isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Username</p>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            disabled={!isEditing}
            className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
              }`}
          />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Email</p>
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            disabled={!isEditing}
            className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
              }`}
          />
        </div>
        <div className="mb-[20px]">
          <p className="font-semibold">Phone</p>
          <input
            type="text"
            value={updatedUser.phone}
            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
            disabled={!isEditing}
            className={`w-full p-2 border-2 rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
              }`}
          />
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        ) : (
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
