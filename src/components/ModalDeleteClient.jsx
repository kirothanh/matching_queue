/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback } from "react";

export default function ModalDeleteClient({
  open,
  setOpen,
  onConfirm,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn thực hiện hành động này?",
  cancelText = "Hủy bỏ",
  confirmText = "Xác nhận",
  confirmButtonColor = "primary",
}) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelText}</Button>
        <Button onClick={handleConfirm} autoFocus color={confirmButtonColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
