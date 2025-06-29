import apiClient from "@/lib/apiClient";

export const createDevice = async (data) => {
  const payload = {
    ...data,
    location: `[${data.location.split(",").map((n) => parseFloat(n.trim()))}]`,
  };
  return apiClient.post("/v1/onboarding-device", payload).then((res) => res.data);
};

export const updateDevice = async (deviceId, data) => {
  const payload = {
    ...data,
  };
  return apiClient.put(`/v1/onboarding-device/${deviceId}`, payload).then((res) => res.data);
};

export const deleteDevice = async (deviceId) => {
  return apiClient.delete(`/v1/onboarding-device/${deviceId}`).then((res) => res.data);
};
