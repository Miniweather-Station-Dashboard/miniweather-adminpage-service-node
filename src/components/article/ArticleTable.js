import React, { useState } from "react";

export default function ArticleTable({ articles, onEdit, onDelete }) {
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteArticle = (articleId) => {
    setArticleToDelete(articleId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(articleToDelete);
    setIsModalOpen(false);
    setArticleToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setArticleToDelete(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Title",
                  "Image",
                  "Published",
                  "Created",
                  "Updated",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {article.title}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {article.headerImageUrl ? (
                      <a
                        href={article.headerImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={article.headerImageUrl}
                          alt={`Image for ${article.title}`}
                          title={`Click to open image`}
                          className="w-24 h-16 object-cover rounded hover:opacity-80 transition"
                        />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        article.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-600 whitespace-nowrap">
                    {new Date(article.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-600 whitespace-nowrap">
                    {new Date(article.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => onEdit(article)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
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
            <h2 className="text-lg font-medium text-gray-900">
              Confirm Delete
            </h2>
            <p className="text-gray-600 my-4 text-sm">
              Are you sure you want to delete the article &quot;
              {articles.find((a) => a.id === articleToDelete)?.title}&quot;?
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
