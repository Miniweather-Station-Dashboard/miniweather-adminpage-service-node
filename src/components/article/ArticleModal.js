"use client";

import { useEffect, useRef, useState } from "react";

export default function ArticleModal({
  mode = "create",
  show,
  formData,
  onClose,
  onChange,
  onSubmit,
  currentArticle,
}) {
  const [selectedImageName, setSelectedImageName] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (mode === "edit" && currentArticle && currentArticle.headerImageUrl) {
      setSelectedImageName(currentArticle.headerImageUrl.split("/").pop());
    } else {
      setSelectedImageName("");
    }
  }, [mode, currentArticle]);

  if (!show) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(e); // forward the event
    if (file) {
      setSelectedImageName(file.name);
    } else {
      setSelectedImageName("");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-7xl shadow">
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
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const textarea = e.target;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const newValue =
                    formData.content.substring(0, start) +
                    "\t" +
                    formData.content.substring(end);

                  // Manually trigger onChange with new value
                  onChange({
                    target: {
                      name: "content",
                      value: newValue,
                    },
                  });

                  // Move the cursor after the tab
                  setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                  }, 0);
                }
              }}
              required
              className="w-full border p-2 rounded h-[30rem]"
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

          {mode === "create" && (
            <div>
              <label className="block text-gray-700 mb-1">Header Image</label>
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {selectedImageName ? "Change Image" : "Upload Image"}
              </button>
              <span className="ml-2 text-sm text-gray-600">
                {selectedImageName}
              </span>
              <input
                type="file"
                name="headerImageFile"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

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
