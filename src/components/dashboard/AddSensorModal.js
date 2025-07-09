import { useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "@/lib/apiClient";
import { fetchSensorTypes } from "@/redux/hooks/fetchSensorType";
import { fetchRecentActivitiesData } from "@/redux/hooks/fetchRecentActivity";

export default function AddSensorModal({ onClose }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const payload = { name, unit, description };
      const res = await apiClient.post("/v1/sensor-types", payload);

      if (res.data.status === "success") {
        fetchSensorTypes(dispatch);
        fetchRecentActivitiesData(dispatch, 3, 0); 
        onClose();
      } else {
        alert("Failed to add sensor type: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error adding sensor type.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Add New Sensor Type</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Sensor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Measurement unit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Sensor description"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Sensor Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
