import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setArticles, setStatus, setError } from "../slices/articleSlice";
import { fetchArticles } from "@/services/articleService";

export default function useArticles(page = 1, limit = 10) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getArticles = async () => {
      dispatch(setStatus("loading"));
      dispatch(setError(null));

      try {
        const response = await fetchArticles(page, limit);

        if (response.status === "success" && Array.isArray(response.data.articles)) {
          dispatch(setArticles({
            articles: response.data.articles,
            total: response.data.total
          }));
          dispatch(setStatus("succeeded"));
        } else {
          dispatch(setError(response.message || "Unknown error"));
          dispatch(setStatus("failed"));
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
        dispatch(setError(error.message || "Failed to fetch articles"));
        dispatch(setStatus("failed"));
      }
    };

    getArticles();
  }, [dispatch, page, limit]);
}
