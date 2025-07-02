import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backend: "unknown",    // "online" | "offline" | "unknown"
  hyperbase: "unknown",  // "online" | "offline" | "unknown"
  lastUpdated: null,
};

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState,
  reducers: {
    setHyperbaseStatus(state, action) {
      state.hyperbase = action.payload.status;
      state.lastUpdated = action.payload.timestamp;
    },
    setBackendStatus(state, action) {
      state.backend = action.payload.status;
      state.lastUpdated = action.payload.timestamp;
    },
    resetStatus(state) {
      state.backend = "unknown";
      state.hyperbase = "unknown";
      state.lastUpdated = null;
    },
  },
});

export const { setHyperbaseStatus, setBackendStatus, resetStatus } = systemStatusSlice.actions;
export default systemStatusSlice.reducer;
