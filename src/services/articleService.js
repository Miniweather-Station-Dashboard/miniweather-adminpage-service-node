import apiClient from "@/lib/apiClient";

export const fetchArticles = async (page = 1, limit = 10, isPublished, search) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
    });

    if (isPublished !== undefined) queryParams.append("is_published", isPublished);
    if (search) queryParams.append("search", search);

    const response = await apiClient.get(`/v1/articles?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
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

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update article (can also remove image)
export const updateArticle = async (articleId, articleData) => {
  try {
    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("content", articleData.content);
    formData.append("is_published", articleData.is_published);

    // If image is provided
    if (articleData.headerImageFile) {
      formData.append("headerImage", articleData.headerImageFile);
    }

    // If request to remove image
    if (articleData.removeHeaderImage) {
      formData.append("removeHeaderImage", "true");
    }

    const response = await apiClient.put(`/v1/articles/${articleId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete article
export const deleteArticle = async (articleId) => {
  try {
    const response = await apiClient.delete(`/v1/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
