"use client";

import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUsers from "@/redux/hooks/fetchUserData";
import { 
  createUser, 
  updateUser, 
  deleteUser 
} from "@/services/userService";
import { 
  setStatus, 
  setError, 
  setUsers,
  setPagination
} from "@/redux/slices/userSlice";
import UserTable from "@/components/user/UserTable";
import Pagination from "@/components/Pagination";
import UserModal from "@/components/user/UserModal";

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { 
    users, 
    status, 
    error, 
    pagination 
  } = useSelector((state) => state.users);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
  });

  useUsers(pagination.page, pagination.limit);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.total / pagination.limit)) return;
    dispatch(setPagination({ page: newPage }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await createUser(formData);
      if (response.status === "success") {
        dispatch(setUsers({
          users: [response.data, ...users],
          total: pagination.total + 1
        }));
        setShowCreateModal(false);
        setFormData({ name: "", email: "", role: "admin" });
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to create user"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to create user"));
      dispatch(setStatus("failed"));
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await updateUser(currentUser.id, formData);
      if (response.status === "success") {
        dispatch(setUsers({
          users: users.map((user) =>
            user.id === currentUser.id ? response.data.user : user
          ),
          total: pagination.total
        }));
        setShowEditModal(false);
        setCurrentUser(null);
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to update user"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to update user"));
      dispatch(setStatus("failed"));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    dispatch(setStatus("loading"));
    try {
      const response = await deleteUser(userId);
      if (response.status === "success") {
        dispatch(setUsers({
          users: users.filter((user) => user.id !== userId),
          total: pagination.total - 1
        }));
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to delete user"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to delete user"));
      dispatch(setStatus("failed"));
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  if (status === "loading") {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading users...</p>
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
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New User
        </button>
      </div>

      <UserTable 
        users={users} 
        onEdit={openEditModal} 
        onDelete={handleDeleteUser} 
      />

      <Pagination
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        onPageChange={handlePageChange}
      />

      <UserModal
        mode="create"
        show={showCreateModal}
        formData={formData}
        onClose={() => setShowCreateModal(false)}
        onChange={handleInputChange}
        onSubmit={handleCreateUser}
      />

      <UserModal
        mode="edit"
        show={showEditModal}
        formData={formData}
        currentUser={currentUser}
        onClose={() => setShowEditModal(false)}
        onChange={handleInputChange}
        onSubmit={handleEditUser}
      />
    </div>
  );
}