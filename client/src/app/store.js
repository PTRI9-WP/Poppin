import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import businessReducer from '../features/businesses/businessSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    businesses: businessReducer,
  },
});
