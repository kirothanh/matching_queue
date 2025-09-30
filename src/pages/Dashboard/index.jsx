import { Input } from "@mui/material";
import { useState } from "react";
import DashBoardShow from "./DashBoardShow";
import PostModal from "../../components/PostModal";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

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
          onPostSuccess={handlePostSuccess}
        />
        <DashBoardShow key={refreshKey} />
      </div>
    </div>
  );
}
