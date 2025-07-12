import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import authorizedAxiosInstance from "../../../utils/authorizedAxios";
import { FaPen, FaTrash } from "react-icons/fa";
import ModalDelete from "../../../components/ModalDelete";

export default function Stadium() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [id, setId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  }

  const columns = useMemo(() => [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên sân bóng", width: 200 },
    {
      field: "fullAddress",
      headerName: "Địa chỉ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, item) =>
        `${item.address || ""}, ${item.ward.name || ""}, ${item.district.name || ""
        }, ${item.province.name || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-start gap-4 h-full">
            <FaPen className="text-lg cursor-pointer" onClick={() => navigate(`/admin/stadium/edit/${params.row.id}`)} />
            <FaTrash className="text-lg cursor-pointer text-red-600" onClick={() => {
              setOpen(true);
              setId(params.id);
            }} />
          </div>
        );
      },
    }
  ], []);

  const paginationModel = { page: 0, pageSize: 5 };

  // useEffect(() => {
  //   const getStadiums = async () => {
  //     const res = await authorizedAxiosInstance.get("/admin/stadiums/");
  //     setStadiums(res.data.data);
  //   };
  //   getStadiums();
  // }, []);

  const getStadiums = async () => {
    const res = await authorizedAxiosInstance.get("/admin/stadiums/");
    setStadiums(res.data.data);
  };

  useEffect(() => {
    getStadiums();
  }, []);

  return (
    <>
      <div className="py-8 w-full h-full">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="font-bold text-2xl">Sân bóng!</h2>
            <p className="mt-2">Danh sách thông tin tổng quan về sân bóng</p>
          </div>
          <div onClick={() => navigate("/admin/stadium/create")}>
            <Button
              variant="contained"
              startIcon={<BsFillPlusCircleFill className="text-sm" />}
            >
              Tạo mới
            </Button>
          </div>
        </div>
        <div className="mt-[15px]">
          <Paper className="h-full w-full">
            <DataGrid
              rows={stadiums}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
      <ModalDelete url={`/admin/stadiums/delete/${id}`} title="sân bóng" open={open} handleClose={handleClose} setId={setId} onDeleted={getStadiums} />
    </>
  );
}
