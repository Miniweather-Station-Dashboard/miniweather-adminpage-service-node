import apiClient from "@/lib/apiClient"; 

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
        throw error;
    }
};

export const deleteErrorFromApi = async (errorId) => {
    try {
        const response = await apiClient.delete(`/v1/errors/${errorId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting error ${errorId} from API:`, error);
        throw error;
    }
};
