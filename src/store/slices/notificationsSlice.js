import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "../../utils/authorizedAxios";

export const postNoti = createAsyncThunk(
  "notifications/postNoti",
  async (notification, { rejectWithValue }) => {
    try {
      const res = await authorizedAxiosInstance.post(
        "/notifications/create",
        notification
      );
      console.log("Response from server:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNoti.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNoti.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(postNoti.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user data";
      });
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;


// const notification = {
//   userId: userValue?.id,
//   title: message
// }