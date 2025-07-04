import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

/**
 * Fetches server errors from the API with pagination.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of errors per page.
 * @returns {Promise<object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const fetchErrors = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/v1/errors?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchErrors service:", error);
    toast.error("Failed to fetch errors.");
    throw error;
  }
};

/**
 * Deletes a specific error from the API.
 * @param {string} errorId - The ID of the error to delete.
 * @returns {Promise<object>} - A promise that resolves to the API response data.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const deleteErrorFromApi = async (errorId) => {
  try {
    const response = await apiClient.delete(`/v1/errors/${errorId}`);
    toast.success("Error log deleted successfully.");
    return response.data;
  } catch (error) {
    console.error(`Error deleting error ${errorId} from API:`, error);
    toast.error("Failed to delete error log.");
    throw error;
  }
};
