import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/apiClient";
import Select from "react-select";
import { fetchDevice } from "@/redux/hooks/fetchDeviceData";
import { fetchRecentActivitiesData } from "@/redux/hooks/fetchRecentActivity";

export default function AddDeviceModal({ onClose }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("inactive");
  const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { sensorTypes } = useSelector((state) => state.sensorType);
  const sensorOptions = sensorTypes.map((sensor) => ({
    value: sensor.id,
    label: sensor.name,
  }));

  const validateCoordinate = (coord) => {
    const coordRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return coordRegex.test(coord);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name || name.trim().length < 3) {
      newErrors.name = "Name is required (min. 3 characters)";
    } else if (name.length > 64) {
      newErrors.name = "Name must be max. 64 characters";
    }
    if (!selectedSensorTypes.length) {
      newErrors.sensorTypes = "Select at least one sensor type";
    }
    if (!location) {
      newErrors.location = "Location is required";
    } else if (!validateCoordinate(location)) {
      newErrors.location = "Invalid format. Use 'latitude, longitude'";
    } else {
      const [lat, lng] = location.split(',').map(x => parseFloat(x.trim()));
      if (isNaN(lat) || isNaN(lng)) {
        newErrors.location = "Latitude/longitude must be numbers";
      } else if (lat < -90 || lat > 90) {
        newErrors.location = "Latitude must be between -90 and 90";
      } else if (lng < -180 || lng > 180) {
        newErrors.location = "Longitude must be between -180 and 180";
      }
    }
    if (!status) {
      newErrors.status = "Status is required";
    } else if (!["active", "inactive"].includes(status)) {
      newErrors.status = "Invalid status";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
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
        fetchRecentActivitiesData(dispatch, 3, 0);
        onClose();
      } else {
        alert("Failed to add device: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error adding device.");
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const handleSelectChange = (value) => {
    setSelectedSensorTypes(value);
    setErrors((prev) => ({ ...prev, sensorTypes: undefined }));
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
              onChange={handleInputChange(setName, "name")}
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Device name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sensor Types
            </label>
            <Select
              isMulti
              options={sensorOptions}
              value={selectedSensorTypes}
              onChange={handleSelectChange}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {errors.sensorTypes && (
              <p className="text-red-500 text-xs mt-1">{errors.sensorTypes}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (Latitude, Longitude)
            </label>
            <input
              value={location}
              onChange={handleInputChange(setLocation, "location")}
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="-6.200000, 106.816666"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={handleInputChange(setStatus, "status")}
              className={`w-full px-3 py-2 border rounded-md ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
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