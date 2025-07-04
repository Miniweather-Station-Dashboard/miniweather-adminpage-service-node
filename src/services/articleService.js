import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";

export const fetchArticles = async (page = 1, limit = 10, isPublished, search) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
    });

    if (isPublished !== undefined) queryParams.append("is_published", isPublished);
    if (search) queryParams.append("search", search);

    const response = await apiClient.get(`/v1/articles/admin?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch articles.");
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("content", articleData.content);
    formData.append("is_published", articleData.is_published);
    formData.append("public", "true"); // Required by API

    if (articleData.headerImageFile) {
      formData.append("headerImage", articleData.headerImageFile);
    }

    const response = await apiClient.post("/v1/articles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Article created successfully.");
    return response.data;
  } catch (error) {
    toast.error("Failed to create article.");
    throw error;
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("content", articleData.content);
    formData.append("is_published", articleData.is_published);

    if (articleData.headerImageFile) {
      formData.append("headerImage", articleData.headerImageFile);
    }

    if (articleData.removeHeaderImage) {
      formData.append("removeHeaderImage", "true");
    }

    const response = await apiClient.put(`/v1/articles/${articleId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Article updated successfully.");
    return response.data;
  } catch (error) {
    toast.error("Failed to update article.");
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await apiClient.delete(`/v1/articles/${articleId}`);
    toast.success("Article deleted successfully.");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete article.");
    throw error;
  }
};
