import { useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle"
import { useEffect, useState } from "react";
import { createUser, getUserById, updateUser, uploadImage } from "../../../api";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Tên người dùng không được để trống"),
  email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  phone: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số")
    .min(9, "Số điện thoại phải có ít nhất 9 chữ số")
    .max(11, "Số điện thoại không được vượt quá 11 chữ số"),
});

const UsersCreateAndDelete = () => {
  let { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const res = await getUserById(id);
        reset(res.data.data);
        setImage(res.data.data.avatar);
      };
      fetchUser();
    }
  }, [id]);

  const onSubmit = async (data) => {
    const resUpload = await uploadImage(image);
    if (resUpload.data.url) {
      toast.success("Tải ảnh lên thành công");
    } else {
      toast.error("Tải ảnh lên thất bại");
    }

    const submitData = {
      ...data,
      avatar: resUpload.data.url,
    }

    const res = await createUser(submitData);
    if (res.data.success) {
      toast.success("Tạo người dùng thành công");
    } else {
      toast.error("Tạo người dùng thất bại");
    }

    navigate("/admin/users");
  }
  const onSubmitUpdate = async (data) => {
    const resUpload = await uploadImage(image);
    if (resUpload.data.url) {
      toast.success("Tải ảnh lên thành công");
    } else {
      toast.error("Tải ảnh lên thất bại");
    }

    const submitData = {
      ...data,
      avatar: resUpload.data.url,
    }

    const res = await updateUser(id, submitData);
    if (res.data.success) {
      toast.success("Cập nhật người dùng thành công");
    } else {
      toast.error("Cập nhật người dùng thất bại");
    }

    navigate("/admin/users");
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <HeaderTitle title="người dùng" id={id} />

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
        gap={3}
        className="mt-5"
      >
        <Paper sx={{ padding: 3 }} className="bg-[#d2e0f241]">
          <form onSubmit={id ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Tên người dùng" variant="outlined" className="w-full mb-4" error={!!errors.name} helperText={errors.name?.message || ""} />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Email" variant="outlined" className="w-full mb-4" error={!!errors.email} helperText={errors.email?.message || ""} />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Số điện thoại" variant="outlined" className="w-full mb-4" error={!!errors.phone} helperText={errors.phone?.message || ""} />
              )}
            />

            <Button type="submit" variant="contained" className="w-full">
              {id ? "Cập nhật" : "Tạo"}
            </Button>
          </form>
        </Paper>

        <Paper sx={{ padding: 3, textAlign: "left" }}>
          <Typography variant="h6" fontWeight="bold">
            Hình ảnh chính
          </Typography>

          <Box className="border-2 border-dashed border-gray-300 p-4 rounded-md h-72 flex items-center justify-center flex-col relative">
            {image ? (
              <Box
                component="img"
                src={image}
                alt="preview image"
                className="max-w-full max-h-full object-contain rounded-[2px]"
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                Upload
              </Typography>
            )}
            <Button
              component="label"
              className="absolute -bottom-6 bg-gray-300 text-black rounded-md font-bold px-4 py-2"
            >
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default UsersCreateAndDelete