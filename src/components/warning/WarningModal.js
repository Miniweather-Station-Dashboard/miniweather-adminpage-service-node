"use client";

export default function WarningModal({
  mode = "create",
  show,
  formData,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Create Warning" : "Edit Warning"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              required
              className="w-full border p-2 rounded h-32"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={onChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.isActive}
              onChange={onChange}
              id="is_active"
            />
            <label htmlFor="isActive" className="text-gray-700">
              Active
            </label>
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
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
