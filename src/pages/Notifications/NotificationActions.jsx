import { Button } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function NotificationActions() {
  return (
    <div className="flex items-center gap-2">
      <Button sx={{ textTransform: "initial" }} variant="text">
        <IoCheckmarkDoneSharp className="mr-1" /> Đánh dấu là đã đọc
      </Button>
      <Button sx={{ textTransform: "initial", color: "red" }} variant="text">
        <FaTrash className="mr-1 text-[14px]" /> Xóa tất cả
      </Button>
    </div>
  )
}
