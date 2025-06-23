import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWarnings } from "@/services/warningService";
import { setWarnings, setStatus, setError } from "@/redux/slices/warningSlice";

export default function useWarnings(page = 1, limit = 10) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getWarnings = async () => {
      dispatch(setStatus("loading"));
      dispatch(setError(null));

      try {
        const response = await fetchWarnings(page, limit);
        console.log("Fetched warnings:", response);

        if (response.status === "success" && Array.isArray(response.data.warnings)) {
          dispatch(setWarnings({
            warnings: response.data.warnings,
            total: response.data.total
          }));
          dispatch(setStatus("succeeded"));
        } else {
          dispatch(setError(response.message || "Unknown error"));
          dispatch(setStatus("failed"));
        }
      } catch (error) {
        console.error("Warnings fetch error:", error);
        dispatch(setError(error.message || "Failed to fetch warnings"));
        dispatch(setStatus("failed"));
      }
    };

    getWarnings();
  }, [dispatch, page, limit]);
}
