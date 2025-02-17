import { Button } from "@mui/material";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function NotificationActions() {
  const { data: userValue } = useSelector((state) => state.user.userValue);

  const handleUpdateReadAllNoti = async (userId) => {
    const res = await axios.put(`${import.meta.env.VITE_SERVER_API}/notifications/${userId}`);
    toast.success(res.data.message);
  }

  const handleDeleteAllNoti = async (userId) => {
    const res = await axios.delete(`${import.meta.env.VITE_SERVER_API}/notifications/${userId}`);
    toast.success(res.data.message);
  }

  return (
    <div className="flex items-center gap-2">
      <Button sx={{ textTransform: "initial" }} variant="text" onClick={() => handleUpdateReadAllNoti(userValue?.id)}>
        <IoCheckmarkDoneSharp className="mr-1" /> Đánh dấu là đã đọc
      </Button>
      <Button sx={{ textTransform: "initial", color: "red" }} variant="text" onClick={() => handleDeleteAllNoti(userValue?.id)}>
        <FaTrash className="mr-1 text-[14px]" /> Xóa tất cả
      </Button>
    </div>
  )
}
