import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MatchingCreate() {
  const { data: userValue } = useSelector((state) => state.user.userValue);
  const [stadiums, setStadiums] = useState([]);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    stadiumId: Yup.string().required("Vui lòng chọn sân bóng."),
    clubId: Yup.string().required("Vui lòng chọn câu lạc bộ."),
    matchDate: Yup.date()
      .required("Vui lòng chọn ngày đấu.")
      .typeError("Ngày đấu không hợp lệ."),
    contactNumber: Yup.string()
      .required("Vui lòng nhập số điện thoại liên hệ.")
      .matches(/^\d{10,11}$/, "Số điện thoại phải có 10-11 chữ số."),
    description: Yup.string(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stadiumId: "",
      clubId: "",
      matchDate: "",
      contactNumber: userValue?.phone || "",
      description: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        stadium_id: data.stadiumId,
        club_id: data.clubId,
        matchDate: moment(
          data.matchDate,
          "ddd MMM DD YYYY HH:mm:ss"
        ).toISOString(),
        contactNumber: data.contactNumber,
        description: data.description,
      };
      const res = await authorizedAxiosInstance.post(
        "/matches/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/matching");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (userValue?.phone) {
      setValue("contactNumber", userValue.phone, { shouldValidate: true });
    }
  }, [userValue]);

  useEffect(() => {
    const getStadiums = async () => {
      try {
        const res = await authorizedAxiosInstance.get("/admin/stadiums");
        setStadiums(res.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getStadiums();

    const getClubs = async () => {
      try {
        const res = await authorizedAxiosInstance.get("/club");
        setClubs(res.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getClubs();
  }, []);

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
          Tạo trận đấu mới
        </h2>
      </div>

      <div className="p-4 max-w-[80%] mx-auto">
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            margin: "20px 0",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "#37003c",
          }}
        >
          Chọn thông tin trận đấu
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel id="select-club-label">Chọn câu lạc bộ</InputLabel>
              <Controller
                name="clubId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="select-club-label"
                    label="Chọn câu lạc bộ"
                  >
                    {clubs.map((club) => (
                      <MenuItem key={club.id} value={club.id}>
                        {club.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.clubId && (
                <Typography color="error">{errors.clubId.message}</Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel id="select-stadium-label">Chọn sân bóng</InputLabel>
              <Controller
                name="stadiumId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="select-stadium-label"
                    label="Chọn sân bóng"
                  >
                    {stadiums.map((stadium) => (
                      <MenuItem key={stadium.id} value={stadium.id}>
                        {stadium.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.stadiumId && (
                <Typography color="error">
                  {errors.stadiumId.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Controller
              name="matchDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Ngày đấu"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.matchDate}
                  helperText={errors.matchDate?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="text"
                  label="Số điện thoại liên hệ"
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                />
              )}
            />
          </Box>
          <Box className="mb-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Mô tả trận đấu"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#3876d1" }}
          >
            Tạo trận đấu
          </Button>
        </form>
      </div>
    </div>
  );
}
