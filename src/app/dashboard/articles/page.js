"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useArticles from "@/redux/hooks/fetchArticleData";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/services/articleService";
import {
  setStatus,
  setError,
  setArticles,
  setPagination,
} from "@/redux/slices/articleSlice";
import ArticleTable from "@/components/article/ArticleTable";
import Pagination from "@/components/Pagination";
import ArticleModal from "@/components/article/ArticleModal";

export default function ArticleManagementPage() {
  const dispatch = useDispatch();
  const { articles, status, error, pagination } = useSelector(
    (state) => state.articles
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_published: false,
    headerImageFile: null,
  });

  useArticles(pagination.page, pagination.limit);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.total / pagination.limit))
      return;
    dispatch(setPagination({ page: newPage }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, headerImageFile: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await createArticle(formData);
      if (response.status === "success") {
        dispatch(
          setArticles({
            articles: [response.data.article, ...articles],
            total: pagination.total + 1,
          })
        );
        setShowCreateModal(false);
        setFormData({
          title: "",
          content: "",
          is_published: false,
          headerImageFile: null,
        });
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to create article"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to create article"));
      dispatch(setStatus("failed"));
    }
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();
    dispatch(setStatus("loading"));
    try {
      const response = await updateArticle(currentArticle.id, formData);
      if (response.status === "success") {
        dispatch(
          setArticles({
            articles: articles.map((article) =>
              article.id === currentArticle.id ? response.data.article : article
            ),
          })
        );
        setShowEditModal(false);
        setCurrentArticle(null);
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to update article"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to update article"));
      dispatch(setStatus("failed"));
    }
  };

  const handleDeleteArticle = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    dispatch(setStatus("loading"));
    try {
      const response = await deleteArticle(articleId);
      if (response.status === "success") {
        dispatch(
          setArticles({
            articles: articles.filter((article) => article.id !== articleId),
            total: pagination.total - 1,
          })
        );
        dispatch(setStatus("succeeded"));
      } else {
        dispatch(setError(response.message || "Failed to delete article"));
        dispatch(setStatus("failed"));
      }
    } catch (err) {
      dispatch(setError(err.message || "Failed to delete article"));
      dispatch(setStatus("failed"));
    }
  };

  const openEditModal = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      is_published: article.isPublished,
      headerImageFile: null,
    });
    setShowEditModal(true);
  };

  if (status === "loading") {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading articles...</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Article Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Article
        </button>
      </div>

      <ArticleTable
        articles={articles}
        onEdit={openEditModal}
        onDelete={handleDeleteArticle}
      />

      <Pagination
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        onPageChange={handlePageChange}
      />

      <ArticleModal
        mode="create"
        show={showCreateModal}
        formData={formData}
        onClose={() => setShowCreateModal(false)}
        onChange={handleInputChange}
        onSubmit={handleCreateArticle}
      />

      <ArticleModal
        mode="edit"
        show={showEditModal}
        formData={formData}
        currentArticle={currentArticle}
        onClose={() => setShowEditModal(false)}
        onChange={handleInputChange}
        onSubmit={handleEditArticle}
      />
    </div>
  );
}
