import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errors: [],
    status: "idle",
    currentError: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    }
};

const errorSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setErrors: (state, action) => {
            state.errors = action.payload.errors;
            state.pagination = action.payload.pagination;
        },
        addError: (state, action) => {
            state.errors.push({
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...action.payload,
            });
            state.currentError = action.payload.message;
        },
        clearError: (state, action) => {
            const initialLength = state.errors.length;
            state.errors = state.errors.filter((error) => error.id !== action.payload);
            if (state.errors.length < initialLength) {
                state.pagination.total = Math.max(0, state.pagination.total - 1);
            }
            if (state.currentError && state.errors.length === 0) {
                state.currentError = null;
            } else if (state.currentError && state.errors.length > 0 && action.payload === state.errors[state.errors.length - 1]?.id) {
                 state.currentError = state.errors[state.errors.length - 1]?.message || null;
            }
        },
        clearAllErrors: (state) => {
            state.errors = [];
            state.currentError = null;
            state.pagination = {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
            };
        },
        setErrorStatus: (state, action) => {
            state.status = action.payload;
        },
        setCurrentErrorMessage: (state, action) => {
            state.currentError = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = {
                ...state.pagination,
                ...action.payload
            };
        }
    },
});

export const {
    setErrors,
    addError,
    clearError,
    clearAllErrors,
    setErrorStatus,
    setCurrentErrorMessage,
    setPagination
} = errorSlice.actions;

export default errorSlice.reducer;
