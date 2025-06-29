"use client";

export default function DeviceModal({
  mode = "create",
  show,
  formData,
  onClose,
  onChange,
  onSubmit,
  locationError,
}) {


  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Add New Device" : "Edit Device"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Location (Latitude, Longitude)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="-6.200000, 106.816666"
              className={`w-full border p-2 rounded ${
                locationError ? "border-red-500" : ""
              }`}
              required
            />
            {locationError && (
              <p className="text-red-500 text-sm mt-1">{locationError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {mode === "create" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
