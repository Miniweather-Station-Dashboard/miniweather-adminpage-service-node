import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/v1/users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch users.");
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/v1/auth/register", userData);
    toast.success("User created successfully.");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create user.");
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/v1/users/${userId}`, userData);
    toast.success("User updated successfully.");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update user.");
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/v1/users/${userId}`);
    toast.success("User deleted successfully.");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete user.");
    throw error;
  }
};
