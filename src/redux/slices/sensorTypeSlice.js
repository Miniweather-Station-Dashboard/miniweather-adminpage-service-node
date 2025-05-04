import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sensorTypes: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const sensorTypesSlice = createSlice({
  name: "sensorTypes",
  initialState,
  reducers: {
    setSensorTypes: (state, action) => {
      state.sensorTypes = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSensorTypes, setStatus, setError } = sensorTypesSlice.actions;
export default sensorTypesSlice.reducer;
