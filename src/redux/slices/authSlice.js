import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  verification: {
    status: "idle", // 'idle' | 'pending' | 'verified' | 'failed'
    attempts: 0,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.verification.status = "verified";
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    startVerification: (state, action) => {
      state.verification = {
        email: action.payload,
        status: "pending",
        attempts: 0,
      };
    },
    completeVerification: (state) => {
      state.verification.status = "verified";
    },
    incrementVerificationAttempts: (state) => {
      state.verification.attempts += 1;
    },
    resetVerification: (state) => {
      state.verification = initialState.verification;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      // Clear tokens from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    loadTokensFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        }
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
  loadTokensFromStorage,
  startVerification,
  completeVerification,
  incrementVerificationAttempts,
  resetVerification,
} = authSlice.actions;
export default authSlice.reducer;
