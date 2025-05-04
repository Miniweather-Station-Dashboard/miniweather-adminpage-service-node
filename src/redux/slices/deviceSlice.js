import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDevice: null,
  deviceList: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setActiveDevice: (state, action) => {
      state.activeDevice = action.payload;
    },
    setDeviceList: (state, action) => {
      state.deviceList = action.payload;
    },
    setStatus: (state, action) => {
      const validStatus = ["idle", "loading", "succeeded", "failed"];
      state.status = validStatus.includes(action.payload)
        ? action.payload
        : "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetDeviceState: () => initialState,
  },
});

export const {
  setActiveDevice,
  setDeviceList,
  setStatus,
  setError,
  resetDeviceState,
} = deviceSlice.actions;

export default deviceSlice.reducer;
