import {
  Select,
  MenuItem,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import authorizedAxiosInstance from "../../../utils/authorizedAxios";
import { Controller, useForm, useWatch } from "react-hook-form";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";

export default function StadiumCreate() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [image, setImage] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const stadiumSchema = Yup.object().shape({
    name: Yup.string().required("Tên sân bóng không được để trống."),
    address: Yup.string().required("Địa chỉ không được để trống."),
    province: Yup.string().nullable().required("Vui lòng chọn Tỉnh/Thành phố."),
    district: Yup.string().nullable().required("Vui lòng chọn Quận/Huyện."),
    ward: Yup.string().nullable().required("Vui lòng chọn Phường/Xã."),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      province: "",
      district: "",
      ward: "",
    },
    resolver: yupResolver(stadiumSchema),
  });

  const selectedProvince = useWatch({ control, name: "province" });
  const selectedDistrict = useWatch({ control, name: "district" });

  useEffect(() => {
    const getProvinceList = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/");
      setProvinceList(res.data);
    };
    getProvinceList();
  }, []);

  useEffect(() => {
    const getDistricts = async () => {
      if (selectedProvince) {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
        );
        setDistrictList(res.data.districts || []);
      } else {
        setDistrictList([]);
        setWardList([]);
      }
    };
    getDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const getWards = async () => {
      if (selectedDistrict) {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
        );
        setWardList(res.data.wards || []);
      } else {
        setWardList([]);
      }
    };
    getWards();
  }, [selectedDistrict]);

  useEffect(() => {
    if (id) {
      const fetchStadiumDetail = async () => {
        try {
          const res = await authorizedAxiosInstance.get(`/admin/stadiums/${id}`);
          const data = res.data.data;
          reset({
            name: data.name,
            address: data.address,
            province: data.province_id,
            district: data.district_id,
            ward: data.ward_id,
          });
          setImage(data.image || null);
        } catch (error) {
          toast.error("Không thể tải dữ liệu sân bóng.");
        }
      };
      fetchStadiumDetail();
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("address", data.address);
      form.append("province", data.province);
      form.append("district", data.district);
      form.append("ward", data.ward);

      if (image) {
        const fileInput = document.querySelector('input[type="file"]');
        form.append("image", fileInput.files[0]);
      }

      await authorizedAxiosInstance.post("/admin/stadiums/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tạo sân bóng thành công!");
      navigate("/admin/stadium");
    } catch (err) {
      toast.error("Vui lòng kiểm tra lại thông tin.");
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("address", data.address);
      form.append("province", data.province);
      form.append("district", data.district);
      form.append("ward", data.ward);

      if (image) {
        const oldKeyUrl = image ? image.split("/").pop() : null;
        form.append("oldKeyUrl", oldKeyUrl);
        const fileInput = document.querySelector('input[type="file"]');
        form.append("image", fileInput.files[0]);
      }

      await authorizedAxiosInstance.patch(`/admin/stadiums/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật sân bóng thành công!");
      navigate("/admin/stadium");
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div>
      <HeaderTitle title="sân bóng" id={id} />

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
        gap={3}
        className="mt-5"
      >
        <Paper sx={{ padding: 3 }} className="bg-[#d2e0f241]">
          <Typography variant="h6" fontWeight="bold">
            Tổng quan
          </Typography>
          <Typography variant="body2" className="mb-8">
            Nhập thông tin tổng quan về sân bóng
          </Typography>

          <form onSubmit={id ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  label="Nhập tên sân bóng"
                  variant="outlined"
                  className="w-full mb-4"
                  error={!!errors.name}
                  helperText={errors.name?.message || ""}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nhập địa chỉ cụ thể"
                  variant="outlined"
                  className="w-full mb-4"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  error={!!errors.province}
                  className="w-full mb-4"
                >
                  <MenuItem value="">Chọn Tỉnh, Thành phố</MenuItem>
                  {provinceList.map((province) => (
                    <MenuItem key={province?.code} value={province?.code}>
                      {province?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  disabled={!selectedProvince}
                  error={!!errors.district}
                  className="w-full mb-4"
                >
                  <MenuItem value="">Chọn Quận, Huyện</MenuItem>
                  {districtList.map((district) => (
                    <MenuItem key={district?.code} value={district?.code}>
                      {district?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="ward"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  disabled={!selectedDistrict}
                  error={!!errors.ward}
                  className="w-full mb-4"
                >
                  <MenuItem value="">Chọn Phường, Xã</MenuItem>
                  {wardList.map((ward) => (
                    <MenuItem key={ward?.code} value={ward?.code}>
                      {ward?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              className="border-[#2555a8] border-[2px] text-white w-full"
            >
              Lưu thông tin
            </Button>
          </form>
        </Paper>

        <Paper sx={{ padding: 3, textAlign: "left" }}>
          <Typography variant="h6" fontWeight="bold">
            Hình ảnh chính
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Hình ảnh sẽ được hiển thị trong danh sách sản phẩm
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
  );
}
