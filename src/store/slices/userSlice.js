import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "../../utils/authorizedAxios";

const initialState = {
  userValue: {},
  loading: false,
  error: null,
};

const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  try {
    const res = await authorizedAxiosInstance.get("/profile");
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const getUserFromLogin = createAsyncThunk(
  "user/getUserFromLogin",
  async (data) => {
    try {
      const res = await authorizedAxiosInstance.post("/auth/login", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const getUserFromRegister = createAsyncThunk(
  "user/getUserFromRegister",
  async (data) => {
    try {
      const res = await authorizedAxiosInstance.post("/auth/register", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userValue = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      })
      .addCase(getUserFromLogin.fulfilled, (state, action) => {
        state.userValue = action.payload;
      })
      .addCase(getUserFromRegister.fulfilled, (state, action) => {
        state.userValue = action.payload;
      })
  },
});

// Action creators are generated for each case reducer function
export const { setUserValue } = userSlice.actions;

export { getUserProfile, getUserFromLogin, getUserFromRegister };

export default userSlice.reducer;
