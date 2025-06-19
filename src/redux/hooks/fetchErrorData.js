"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setErrors,
    setErrorStatus,
    setCurrentErrorMessage,
} from "../slices/errorSlice";
import { fetchErrors } from "@/services/errorService";

/**
 * Custom hook to fetch error data with pagination and manage Redux state.
 * @param {number} page - The current page number for fetching errors.
 * @param {number} limit - The number of errors to fetch per page.
 */
export default function useErrors(page = 1, limit = 10) {
    const dispatch = useDispatch();

    useEffect(() => {
        const getErrors = async () => {
            dispatch(setErrorStatus("loading"));
            dispatch(setCurrentErrorMessage(null));

            try {
                const response = await fetchErrors(page, limit);

                if (response.status === "success" && Array.isArray(response.data.errors)) {
                    dispatch(setErrors({
                        errors: response.data.errors,
                        pagination: response.data.pagination
                    }));
                    dispatch(setErrorStatus("succeeded"));
                } else {
                    dispatch(setCurrentErrorMessage(response.message || "Unknown error during fetch"));
                    dispatch(setErrorStatus("failed"));
                }
            } catch (error) {
                console.error("Errors fetch error:", error);
                const errorMessage = error.response?.data?.message || error.message || "Failed to fetch errors";
                dispatch(setCurrentErrorMessage(errorMessage));
                dispatch(setErrorStatus("failed"));
            }
        };

        getErrors();
    }, [dispatch, page, limit]);
}
