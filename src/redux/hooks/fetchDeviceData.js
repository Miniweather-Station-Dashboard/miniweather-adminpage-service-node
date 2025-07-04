import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setActiveDevice,
  setDeviceList,
  setStatus,
  setError,
  setTotalCount,
} from "../slices/deviceSlice";
import apiClient from "@/lib/apiClient";

export async function fetchDevice(dispatch) {
  dispatch(setStatus("loading"));
  dispatch(setError(null));

  try {
    const result = await apiClient.get(`/v1/onboarding-device/admin`);
    
    if (result.data.status === "success") {
      let deviceList = [];

      if (Array.isArray(result.data.data.devices)) {
        deviceList = result.data.data.devices;
      } else if (result.data.data.device) {
        deviceList = [result.data.data.device];
      }

      dispatch(setDeviceList(deviceList));
      dispatch(setTotalCount(result.data.data.totalCount || 0));
      dispatch(setActiveDevice(deviceList[0] || null));
      dispatch(setStatus("succeeded"));
    } else {
      dispatch(setError(result.message || "Unknown error"));
      dispatch(setStatus("failed"));
    }
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch devices"));
    dispatch(setStatus("failed"));
  }
};


export default function useDeviceData() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDevice(dispatch);
  }, [dispatch]);
}
