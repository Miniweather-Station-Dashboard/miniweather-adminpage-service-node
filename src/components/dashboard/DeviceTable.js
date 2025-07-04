import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchDevice } from "@/redux/hooks/fetchDeviceData";
import { deleteDevice } from "@/services/deviceService";
import DeviceModal from "@/components/dashboard/DeviceModal";
import { updateDevice } from "@/services/deviceService";

export default function DeviceTable({ devices, onAddClick }) {
  const dispatch = useDispatch();

  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "inactive",
  });

  const [locationError, setLocationError] = useState("");

  const handleOpenEdit = (device) => {
    setCurrentDevice(device);
     let location = device.location;

  if (typeof location === "string" && location.startsWith("[")) {
    try {
      const parsed = JSON.parse(location);
      if (Array.isArray(parsed)) {
        location = parsed.join(", ");
      }
    } catch {
      location = location.replace(/[\[\]]/g, "").trim();
    }
  }

  setFormData({
    name: device.name,
    location: location,
    status: device.status,
  });
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setCurrentDevice(null);
    setShowEditModal(false);
    setLocationError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const coordRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    if (!coordRegex.test(formData.location)) {
      setLocationError("Invalid format. Use: latitude, longitude");
      return;
    }
    formData.location = `[${formData.location}]`


    try {
      const res = await updateDevice(currentDevice.id, formData);
      if (res.status === "success") {
        fetchDevice(dispatch);
        handleCloseEdit();
      } else {
        alert("Failed to update device");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating device");
    }
  };

  const handleDeleteDevice = (deviceId) => {
    setDeviceToDelete(deviceId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteDevice(deviceToDelete);
      if (res.status === "success") {
        fetchDevice(dispatch);
        setIsConfirmModalOpen(false);
        setDeviceToDelete(null);
      } else {
        alert("Failed to delete device: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting device.");
    }
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setDeviceToDelete(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Onboarding Devices
          </h2>
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add New Device
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Type", "Location", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{device.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline">
                    <Link href={`/dashboard/devices/${device.id}`}>
                      View Details
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        device.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => handleOpenEdit(device)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.id)}
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

      <DeviceModal
        mode="edit"
        show={showEditModal}
        currentDevice={currentDevice}
        formData={formData}
        onChange={handleInputChange}
        onClose={handleCloseEdit}
        onSubmit={handleEditSubmit}
        locationError={locationError}
      />

      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-medium text-gray-900">
              Confirm Delete
            </h2>
            <p className="text-gray-600 my-4">
              Are you sure you want to delete the device &quot;
              {devices.find((device) => device.id === deviceToDelete)?.name}
              &quot;?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseConfirmModal}
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
