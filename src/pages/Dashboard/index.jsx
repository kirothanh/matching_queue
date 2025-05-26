import { Input } from "@mui/material";
import { useState } from "react";
import DashBoardShow from "./DashBoardShow";
import PostModal from "../../components/PostModal";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="h-screen flex flex-col w-full">
      <div className="p-4 relative w-full max-w-[1000px] mx-auto">
        <Input
          placeholder="Nhấn vào đây để đăng bài ...."
          variant="standard"
          onClick={() => setOpenModal(true)}
          className="w-full"
        />

        <PostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={"Đăng bài"}
        />
        <DashBoardShow />
      </div>
    </div>
  );
}
