import apiClient from "@/lib/apiClient";

// Get paginated warnings
export const fetchWarnings = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/v1/warnings?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new warning
export const createWarning = async (warningData) => {
  try {
    const response = await apiClient.post("/v1/warnings", warningData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing warning
export const updateWarning = async (warningId, warningData) => {
  try {
    const response = await apiClient.put(`/v1/warnings/${warningId}`, warningData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a warning
export const deleteWarning = async (warningId) => {
  try {
    const response = await apiClient.delete(`/v1/warnings/${warningId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
