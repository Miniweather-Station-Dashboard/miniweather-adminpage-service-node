import apiClient from "@/lib/apiClient";

export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/v1/users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/v1/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};