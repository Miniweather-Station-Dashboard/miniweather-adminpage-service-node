import React, { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useDispatch } from "react-redux";
import { fetchSensorTypes } from "@/redux/hooks/fetchSensorType";
import { fetchRecentActivitiesData } from "@/redux/hooks/fetchRecentActivity";
import { toast } from "react-toastify";

export default function SensorTable({ sensors, onAddClick }) {
  const dispatch = useDispatch();
  const [sensorToDelete, setSensorToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteSensor = (sensorId) => {
    setSensorToDelete(sensorId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await apiClient.delete(`/v1/sensor-types/${sensorToDelete}`);

      if (res.data.status === "success") {
        fetchSensorTypes(dispatch);
        setIsModalOpen(false);
        setSensorToDelete(null);
        fetchRecentActivitiesData(dispatch, 3, 0); 
        toast.success("Sensor type deleted successfully.");
      } else {
        toast.error("Failed to delete sensor type.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete sensor type.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSensorToDelete(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Sensor Types</h2>
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add New Sensor Type
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{sensor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sensor.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sensor.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteSensor(sensor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-medium text-gray-900">
              Confirm Delete
            </h2>
            <p className="text-gray-600 my-4">
              Are you sure you want to delete the sensor type &quot;
              {sensors.find((sensor) => sensor.id === sensorToDelete)?.name}
              &quot;?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
