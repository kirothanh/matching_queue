/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from "@mui/material";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalDelete({ open, handleClose, id, setId }) {
  const handleDeleteStadium = async () => {
    const res = await authorizedAxiosInstance.delete(`/admin/stadiums/delete/${id}`);
    if (res.data.success) {
      toast.success("Xóa sân bóng thành công !");
      handleClose();
      setId(null);
    } else {
      toast.error("Xóa sân bóng thất bại !");
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center font-semibold text-xl">
          Bạn có chắc muốn xóa ?
        </Typography>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDeleteStadium} className="bg-red-500 text-white">Xóa</Button>
          <Button onClick={handleClose} className="bg-gray-500 text-white">Hủy</Button>
        </div>
      </Box>
    </Modal>
  )
}
