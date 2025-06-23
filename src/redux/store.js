import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import deviceReducer from './slices/deviceSlice'
import sensorTypeReducer from './slices/sensorTypeSlice'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'
import articleReducer from './slices/articleSlice'
import warningReducer from './slices/warningSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
    sensorType: sensorTypeReducer,
    users : userReducer,
    errors: errorReducer,
    articles: articleReducer,
    warnings: warningReducer,
  },
});
