import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../api";
import ModalDelete from "../../../components/ModalDelete";

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Tên người dùng", width: 200 },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "phone", headerName: "Số điện thoại", width: 150, renderCell: (params) =>
          params.value ? params.value : "Chưa có dữ liệu"
      },

      {
        field: "action",
        headerName: "Thao tác",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-start gap-4 h-full">
              <FaPen
                className="text-lg cursor-pointer text-blue-600"
                onClick={() => navigate(`/admin/users/edit/${params.row.id}`)}
              />
              <FaTrash className="text-lg cursor-pointer text-red-600" onClick={() => {
                setOpen(true);
                setId(params.row.id);
              }} />
            </div>
          );
        },
      },
    ],
    [navigate]
  );

  const handleClose = () => {
    setOpen(false);
  }

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      setUsers(result.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Paper className="h-full w-full">
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.id}
        />
      </Paper>
      <ModalDelete url={`/admin/users/delete/${id}`} title="người dùng" open={open} handleClose={handleClose} setId={setId} onDeleted={fetchUsers} />
    </div>
  );
};

export default UsersTable;
