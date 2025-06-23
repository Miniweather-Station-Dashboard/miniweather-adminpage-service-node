import React, { useState } from "react";

export default function WarningTable({ warnings, onEdit, onDelete }) {
  const [warningToDelete, setWarningToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteWarning = (warningId) => {
    setWarningToDelete(warningId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(warningToDelete);
    setIsModalOpen(false);
    setWarningToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWarningToDelete(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Message", "Type", "Status", "Actions"].map((h) => (
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
              {warnings.map((warning) => (
                <tr key={warning.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{warning.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{warning.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        warning.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {warning.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => onEdit(warning)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWarning(warning.id)}
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
            <h2 className="text-lg font-medium text-gray-900">Confirm Delete</h2>
            <p className="text-gray-600 my-4">
              Are you sure you want to delete this warning: &#34;
              {warnings.find((warning) => warning.id === warningToDelete)?.message}
              &#34;?
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
