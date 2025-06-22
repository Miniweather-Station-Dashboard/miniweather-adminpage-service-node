import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload.articles;
      state.pagination.total = action.payload.total;
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
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetArticleState: () => initialState,
  },
});

export const {
  setArticles,
  setStatus,
  setError,
  setPagination,
  resetArticleState,
} = articleSlice.actions;

export default articleSlice.reducer;
