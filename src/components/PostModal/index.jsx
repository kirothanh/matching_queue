/* eslint-disable react/prop-types */
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextEditor from "../TextEditor";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { postArticle } from "../../services/articleService";
import { changeImageType } from "../../utils/changeImageType";
import { useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const PostModal = ({ open, onClose, title, onPostSuccess }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newData = await changeImageType(data);
      const result = await postArticle(newData);
      console.log("result: ", result);
      if (result.success) {
        toast.success(result.message);
        onPostSuccess(); // Gọi callback để thông báo đăng bài thành công
      }
      reset();
      onClose();
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {title}
              </Typography>

              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextEditor value={field.value} onChange={field.onChange} />
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Button variant="outlined" onClick={onClose}>
                  Hủy
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang đăng..." : "Đăng bài"}
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PostModal;
