"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), { ssr: false });

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
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    if (mode === "edit" && currentArticle && currentArticle.headerImageUrl) {
      setSelectedImageName(currentArticle.headerImageUrl.split("/").pop());
    } else {
      setSelectedImageName("");
    }
  }, [mode, currentArticle]);

  if (!show) return null;

  function validate(form) {
    const err = {};
    if (!form.title || form.title.trim().length < 3) {
      err.title = "Title is required and must be at least 3 characters.";
    }
    if (!form.content || form.content.trim().length < 10) {
      err.content = "Content is required and must be at least 10 characters.";
    }
    if (mode === "create" && !form.headerImageFile) {
      err.headerImageFile = "Header image is required.";
    }
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formLike = { ...formData };
    if (mode === "create") {
      formLike.headerImageFile = fileInputRef.current?.files?.[0] || null;
    }
    const err = validate(formLike);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      onSubmit(e);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(e);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
              className={`w-full border p-2 rounded ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="min-h-[200px]">
            <label className="block text-gray-700 mb-1">
              Content (Markdown)
            </label>
            <MarkdownEditor
              value={formData.content}
              onChange={onChange}
              errors={errors}
              className={
                errors.content ? "border border-red-500 rounded p-2 max-h-[200px] overflow-auto " : ""
              }
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-1">{errors.content}</p>
            )}
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
              {errors.headerImageFile && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.headerImageFile}
                </p>
              )}
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
