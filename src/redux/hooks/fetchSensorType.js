import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setSensorTypes,
  setStatus,
  setError,
} from "../slices/sensorTypeSlice";
import apiClient from "@/lib/apiClient"; // adjust path if needed

export default function useSensorTypes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSensorTypes = async () => {
      dispatch(setStatus("loading"));
      dispatch(setError(null));

      try {
        const response = await apiClient.get("/v1/sensor-types");        

        if (response.data.status === "success" && Array.isArray(response.data.data.records)) {
          dispatch(setSensorTypes(response.data.data.records));
          dispatch(setStatus("succeeded"));
        } else {
          dispatch(setError(response.data.message || "Unknown error"));
          dispatch(setStatus("failed"));
        }
      } catch (error) {
        console.error("Sensor types error:", error);
        dispatch(setError(error.message || "Failed to fetch sensor types"));
        dispatch(setStatus("failed"));
      }
    };

    fetchSensorTypes();
  }, [dispatch]);
}
