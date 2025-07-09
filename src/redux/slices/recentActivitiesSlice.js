import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activities: [],
  total: 0,
  limit: 10,
  offset: 0,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const recentActivitiesSlice = createSlice({
  name: "recentActivities",
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload.activities;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPagination: (state, action) => {
      const { limit, offset } = action.payload;
      state.limit = limit;
      state.offset = offset;
    },
  },
});

export const {
  setActivities,
  setStatus,
  setError,
  setPagination,
} = recentActivitiesSlice.actions;

export default recentActivitiesSlice.reducer;
