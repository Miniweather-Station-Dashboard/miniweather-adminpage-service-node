import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.pagination.total = action.payload.total ? action.payload.total : state.pagination.total;
    },
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload
      };
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setStatus, setError, setPagination } = userSlice.actions;
export default userSlice.reducer;