import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setActivities,
  setStatus,
  setError,
} from "../slices/recentActivitiesSlice";

import { fetchRecentActivities } from "@/services/recentActivityService";

export async function fetchRecentActivitiesData(dispatch, limit = 3, offset = 0) {
  dispatch(setStatus("loading"));
  dispatch(setError(null));

  try {
    const result = await fetchRecentActivities(limit, offset);

    if (result && Array.isArray(result.activities)) {
      dispatch(setActivities(result));
      dispatch(setStatus("succeeded"));
    } else {
      dispatch(setError("Unexpected response format"));
      dispatch(setStatus("failed"));
    }
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch recent activities"));
    dispatch(setStatus("failed"));
  }
}

export default function useRecentActivities(limit = 10, offset = 0) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRecentActivitiesData(dispatch, limit, offset);
  }, [dispatch, limit, offset]);
}
