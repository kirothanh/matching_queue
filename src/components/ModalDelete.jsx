/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from "@mui/material";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";

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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2
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
        <IoIosWarning style={{ fontSize: '50px', color: "red" }} />
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#0c0c0c", fontWeight: "bold", textAlign: "center" }}>
          Bạn có chắc muốn xóa ?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button onClick={handleDeleteStadium} sx={{ backgroundColor: "red", color: "white" }} >Xóa</Button>
          <Button onClick={handleClose} sx={{ backgroundColor: "#3876d1", color: "white" }}>Hủy</Button>
        </div>
      </Box>
    </Modal>
  )
}
