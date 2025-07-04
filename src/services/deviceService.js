import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

export const createDevice = async (data) => {
  try {
    const payload = {
      ...data,
      location: `[${data.location
        .split(",")
        .map((n) => parseFloat(n.trim()))}]`,
    };
    const res = await apiClient.post("/v1/onboarding-device", payload);
    toast.success("Device created successfully.");
    return res.data;
  } catch (error) {
    toast.error("Failed to create device.");
    throw error;
  }
};

export const updateDevice = async (deviceId, data) => {
  try {
    const payload = {
      ...data,
    };
    const res = await apiClient.put(
      `/v1/onboarding-device/${deviceId}`,
      payload
    );
    toast.success("Device updated successfully.");
    return res.data;
  } catch (error) {
    toast.error("Failed to update device.");
    throw error;
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    const res = await apiClient.delete(`/v1/onboarding-device/${deviceId}`);
    toast.success("Device deleted successfully.");
    return res.data;
  } catch (error) {
    toast.error("Failed to delete device.");
    throw error;
  }
};
