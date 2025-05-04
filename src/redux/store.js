import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import deviceReducer from './slices/deviceSlice'
import sensorTypeReducer from './slices/sensorTypeSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
    sensorType: sensorTypeReducer,
  },
});
