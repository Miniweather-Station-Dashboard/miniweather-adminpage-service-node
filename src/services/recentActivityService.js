import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

/**
 * Fetch recent activity logs with pagination
 * @param {number} limit - number of activities per page
 * @param {number} offset - offset for pagination
 * @returns {Promise<Object>} { total, limit, offset, activities }
 */
export const fetchRecentActivities = async (limit = 10, offset = 0) => {
  try {
    const queryParams = new URLSearchParams({
      limit,
      offset,
    });

    const response = await apiClient.get(`/v1/recent-activity?${queryParams.toString()}`);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to fetch recent activity logs.");
    throw error;
  }
};
