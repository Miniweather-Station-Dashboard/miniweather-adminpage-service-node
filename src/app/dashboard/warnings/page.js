"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  useWarnings  from "@/redux/hooks/fetchWarningData";
import {
  createWarning,
  updateWarning,
  deleteWarning,
} from "@/services/warningService";
import {
  setStatus,
  setError,
  setWarnings,
  setPagination,
} from "@/redux/slices/warningSlice";
import WarningTable from "@/components/warning/WarningTable";
import Pagination from "@/components/Pagination";
import WarningModal from "@/components/warning/WarningModal";

export default function WarningManagementPage() {
  const dispatch = useDispatch();
  const { warnings, status, error, pagination } = useSelector(
    (state) => state.warnings
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWarning, setCurrentWarning] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
    type: "",
    is_active: true,
  });

  useWarnings(pagination.page, pagination.limit);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.total / pagination.limit))
      return;
    dispatch(setPagination({ page: newPage }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateWarning = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await createWarning(formData);
      if (response.status === "success") {
        dispatch(
          setWarnings({
            warnings: [response.data.warning, ...warnings],
            total: pagination.total + 1,
          })
        );
        setShowCreateModal(false);
        setFormData({ message: "", type: "", is_active: true });
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to create warning"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to create warning"));
      dispatch(setStatus("failed"));
    }
  };

  const handleEditWarning = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await updateWarning(currentWarning.id, formData);
      if (response.status === "success") {
        dispatch(
          setWarnings({
            warnings: warnings.map((warning) =>
              warning.id === currentWarning.id ? response.data.warning : warning
            ),
          })
        );
        setShowEditModal(false);
        setCurrentWarning(null);
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to update warning"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to update warning"));
      dispatch(setStatus("failed"));
    }
  };

  const handleDeleteWarning = async (warningId) => {
    if (!confirm("Are you sure you want to delete this warning?")) return;

    dispatch(setStatus("loading"));
    try {
      const response = await deleteWarning(warningId);
      if (response.status === "success") {
        dispatch(
          setWarnings({
            warnings: warnings.filter((warning) => warning.id !== warningId),
            total: pagination.total - 1,
          })
        );
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to delete warning"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to delete warning"));
      dispatch(setStatus("failed"));
    }
  };

  const openEditModal = (warning) => {
    setCurrentWarning(warning);
    setFormData({
      message: warning.message,
      type: warning.type,
      is_active: warning.isActive,
    });
    setShowEditModal(true);
  };

  if (status === "loading") {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading warnings...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Warning Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Warning
        </button>
      </div>

      <WarningTable
        warnings={warnings}
        onEdit={openEditModal}
        onDelete={handleDeleteWarning}
      />

      <Pagination
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        onPageChange={handlePageChange}
      />

      <WarningModal
        mode="create"
        show={showCreateModal}
        formData={formData}
        onClose={() => setShowCreateModal(false)}
        onChange={handleInputChange}
        onSubmit={handleCreateWarning}
      />

      <WarningModal
        mode="edit"
        show={showEditModal}
        formData={formData}
        currentWarning={currentWarning}
        onClose={() => setShowEditModal(false)}
        onChange={handleInputChange}
        onSubmit={handleEditWarning}
      />
    </div>
  );
}
