import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/apiClient";
import Select from "react-select";
import { fetchDevice } from "@/redux/hooks/fetchDeviceData";

export default function AddDeviceModal({ onClose }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("inactive");
  const [locationError, setLocationError] = useState(""); 

  const dispatch = useDispatch();
  const { sensorTypes } = useSelector((state) => state.sensorType);
  const sensorOptions = sensorTypes.map((sensor) => ({
    value: sensor.id,
    label: sensor.name,
  }));

  const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);

  const validateCoordinate = (coord) => {
    const coordRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return coordRegex.test(coord);
  };

  const handleSubmit = async () => {
    setLocationError("");

    if (!validateCoordinate(location)) {
      setLocationError("Invalid format. Please use 'latitude, longitude' (e.g., '-6.200000, 106.816666').");
      return; 
    }

    const coordinateArray = location.split(',').map(coord => parseFloat(coord.trim()));

    try {
      const payload = {
        name,
        location: `[${coordinateArray}]`,
        status,
        sensorTypeIds: selectedSensorTypes.map((opt) => opt.value),
      };

      const res = await apiClient.post("/v1/onboarding-device", payload);

      if (res.data.status === "success") {
        fetchDevice(dispatch);
        onClose();
      } else {
        alert("Failed to add device: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error adding device.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Add New Device</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Device name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sensor Types
            </label>
            <Select
              isMulti
              options={sensorOptions}
              value={selectedSensorTypes}
              onChange={setSelectedSensorTypes}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (Latitude, Longitude)
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${
                locationError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="-6.200000, 106.816666"
            />
            {locationError && (
              <p className="text-red-500 text-xs mt-1">{locationError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
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
              Add Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}