import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers, setStatus, setError } from "../slices/userSlice";
import { fetchUsers } from "@/services/userService";

export default function useUsers(page = 1, limit = 10) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(setStatus("loading"));
      dispatch(setError(null));

      try {
        const response = await fetchUsers(page, limit);
        
        if (response.status === "success" && Array.isArray(response.data.users)) {
          dispatch(setUsers({
            users: response.data.users,
            total: response.data.total
          }));
          dispatch(setStatus("succeeded"));
        } else {
          dispatch(setError(response.message || "Unknown error"));
          dispatch(setStatus("failed"));
        }
      } catch (error) {
        console.error("Users fetch error:", error);
        dispatch(setError(error.message || "Failed to fetch users"));
        dispatch(setStatus("failed"));
      }
    };

    getUsers();
  }, [dispatch, page, limit]);
}