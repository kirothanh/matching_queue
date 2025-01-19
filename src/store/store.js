import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice';
import { matchesSlice } from './slices/matchesSlice';
import { notificationsSlice } from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    matches: matchesSlice.reducer,
    notifications: notificationsSlice.reducer
  },
})
