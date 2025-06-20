"use client";

import { useEffect ,useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from 'react-icons/io';
import DeviceDetailsSection from "@/components/deviceDetails/DeviceDetailsSection";
import DeviceIntervalEditor from "@/components/deviceDetails/DeviceIntervalEditor";
import DeviceSensorsSection from "@/components/deviceDetails/DeviceSensorsSection";
import DeviceConnectionInfo from "@/components/deviceDetails/DeviceConnectionInfo";
import apiClient from "@/lib/apiClient"; 

export default function DeviceDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDevice = async () => {
      try {
        const response = await apiClient.get(`/v1/onboarding-device/${id}`);
        if (response.data.status === "success" && response.data.data) {
          setDevice(response.data.data.device);
        } else {
          setError(response.data.message || "Unknown error");
        }
      } catch (err) {
        console.error("Failed to fetch device:", err);
        setError(err.message || "Failed to fetch device");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const [updateStatus, setUpdateStatus] = useState({ message: null, type: null });

  const handleUpdateInterval = async (newIntervalValue) => {
    setUpdateStatus({ message: null, type: null }); 
    try {
      const intervalValue = newIntervalValue === '' ? null : Number(newIntervalValue);

      if (intervalValue !== null && (isNaN(intervalValue) || intervalValue < 0)) {
        setUpdateStatus({ message: "Interval must be a non-negative number or left empty.", type: "error" });
        return false; 
      }

      const response = await apiClient.put(`/v1/onboarding-device/${id}`, {
        data_interval_seconds: intervalValue
      });

      if (response.data.status === "success") {
        setDevice(prevDevice => ({
          ...prevDevice,
          data_interval_seconds: intervalValue
        }));
        setUpdateStatus({ message: "Data interval updated successfully!", type: "success" });
        return true; 
      } else {
        setUpdateStatus({ message: response.data.message || "Failed to update data interval.", type: "error" });
        return false; 
      }
    } catch (err) {
      console.error("Failed to update data interval:", err);
      setUpdateStatus({ message: err.response?.data?.message || err.message || "Failed to update data interval due to a network error.", type: "error" });
      return false;
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading device data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Device not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <button
        onClick={() => router.back()}
        className="flex left-5 top-5 absolute items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
      >
        <IoIosArrowBack className="text-xl mr-2" />
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Device Details</h1>
      </div>

      {updateStatus.message && (
        <div className={`p-3 mb-4 rounded-md ${updateStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {updateStatus.message}
        </div>
      )}

      <DeviceDetailsSection device={device} />
      <DeviceIntervalEditor
        device={device}
        onSaveInterval={handleUpdateInterval}
      />
      <DeviceSensorsSection sensors={device.sensors} />
      <DeviceConnectionInfo device={device} />
    </div>
  );
}