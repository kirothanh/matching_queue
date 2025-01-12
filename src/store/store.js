import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice';
import { matchesSlice } from './slices/matchesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    matches: matchesSlice.reducer
  },
})
