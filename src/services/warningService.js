import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

export const fetchWarnings = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/v1/warnings/admin?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch warnings.");
    throw error;
  }
};

export const createWarning = async (warningData) => {
  try {
    const response = await apiClient.post("/v1/warnings", warningData);
    toast.success("Warning created successfully.");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create warning.");
    throw error;
  }
};

export const updateWarning = async (warningId, warningData) => {
  try {
    const response = await apiClient.put(`/v1/warnings/${warningId}`, warningData);
    toast.success("Warning updated successfully.");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update warning.");
    throw error;
  }
};

export const deleteWarning = async (warningId) => {
  try {
    const response = await apiClient.delete(`/v1/warnings/${warningId}`);
    toast.success("Warning deleted successfully.");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete warning.");
    throw error;
  }
};
