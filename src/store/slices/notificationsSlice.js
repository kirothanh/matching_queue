import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.push(action.payload);
    },
    clearNotifications: (state) => {
      state.list = []
    }
  }
})

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;