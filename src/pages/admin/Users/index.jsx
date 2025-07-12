import { Button } from "@mui/material"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import UsersTable from "./UsersTable";

const UsersManage = () => {
  const navigate = useNavigate();
  return (
    <>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="font-bold text-2xl">Quản lý người dùng</h2>
          <p className="mt-2">Danh sách thông tin tổng quan về người dùng</p>
        </div>

        <div onClick={() => navigate("/admin/users/create")}>
          <Button
            variant="contained"
            startIcon={<BsFillPlusCircleFill className="text-sm" />}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <div className="mt-[15px]">
        <UsersTable />
      </div>
    </>
  )
}

export default UsersManage