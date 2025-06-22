"use client";

import { useEffect, useState } from "react";

export default function ArticleModal({
  mode = "create",
  show,
  formData,
  onClose,
  onChange,
  onSubmit,
  currentArticle,
}) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && currentArticle && currentArticle.headerImageUrl) {
      setImagePreview(currentArticle.headerImageUrl);
    } else {
      setImagePreview(null);
    }
  }, [mode, currentArticle]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Create Article" : "Edit Article"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={onChange}
              required
              className="w-full border p-2 rounded h-32"
            ></textarea>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={onChange}
              id="is_published"
            />
            <label htmlFor="is_published" className="text-gray-700">
              Published
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Header Image</label>
            <input
              type="file"
              name="headerImageFile"
              accept="image/*"
              onChange={onChange}
              className="w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
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
