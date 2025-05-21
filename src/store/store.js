import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import matchesReducer from './slices/matchesSlice';
import notificationsReducer from './slices/notificationsSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  matches: matchesReducer,
  notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
