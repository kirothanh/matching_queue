import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Club() {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { data: userValue } = useSelector((state) => state.user.userValue);

  const stadiumSchema = Yup.object().shape({
    name: Yup.string().required("Tên đội bóng không được để trống."),
    imageUrl: Yup.mixed()
      .required("Hình ảnh không được để trống")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: null,
      created_by: userValue?.id
    },
    resolver: yupResolver(stadiumSchema),
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setValue("imageUrl", e.target.files[0], { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);

      if (data.imageUrl) {
        form.append("imageUrl", data.imageUrl);
      }

      const res = await authorizedAxiosInstance.post("/club/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('res: ', res)

      toast.success("Tạo đội bóng thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div>
      <div className="relative h-[80px] w-full bg-gradient-to-r from-[#2fdcffe2] to-[#963cfdd0] -z-[1]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/img/bg-title.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <h2 className="absolute top-1/2 left-[40px] transform -translate-y-1/2 text-white text-3xl font-bold">
          Tạo đội bóng
        </h2>
      </div>

      <div className="p-4">
        <div className="mb-[40px]">
          <Typography variant="h6" fontWeight="bold">
            Hình ảnh chính của CLB
          </Typography>
          {errors.imageUrl && (
            <span className="text-red-500 block mt-2">
              {errors.imageUrl.message}
            </span>
          )}
          <Box className="border-2 border-dashed border-gray-300 p-4 rounded-md h-72 w-80 flex items-center justify-center flex-col relative ">
            {imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
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
                {...register("imageUrl")}
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[15px]">
            <label htmlFor="" className="font-semibold">
              Tên CLB
            </label>
            <input
              type="text"
              className="w-full py-2 px-3 border outline-none rounded-md"
              placeholder="Nhập tên đội bóng"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-[15px]">
            <label htmlFor="" className="font-semibold">
              Mô tả
            </label>
            <textarea
              type="text"
              className="w-full py-2 px-3 border outline-none rounded-md resize-none"
              placeholder="Nhập mô tả"
              {...register("description")}
            />
          </div>
          <Button type="submit" className="py-2 px-4 bg-cyan-600 text-white rounded-md">
            Tạo
          </Button>
        </form>
      </div>
    </div>
  );
}
