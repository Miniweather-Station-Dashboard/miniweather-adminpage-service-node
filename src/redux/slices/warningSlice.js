import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warnings: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const warningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    setWarnings: (state, action) => {
      state.warnings = action.payload.warnings;
      state.pagination.total = action.payload.total ? action.payload.total : state.pagination.total;
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
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
    resetWarningState: () => initialState,
  },
});

export const {
  setWarnings,
  setStatus,
  setError,
  setPagination,
  resetWarningState,
} = warningSlice.actions;
export default warningSlice.reducer;
