import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setHyperbaseStatus, setBackendStatus } from "@/redux/slices/systemStatusSlice";

export default function useSystemStatusSocket() {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const heartbeatTimerRef = useRef(null);

  const HEARTBEAT_TIMEOUT = 6000; 

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socket;

    // ✅ Socket connection = backend is online
    socket.on("connect", () => {
      dispatch(setBackendStatus({ status: "online", timestamp: new Date().toISOString() }));
    });

    // ❌ Socket disconnection = backend is offline
    socket.on("disconnect", () => {
      dispatch(setBackendStatus({ status: "offline", timestamp: new Date().toISOString() }));
    });

    // ✅ Hyperbase status update from backend
    socket.on("hyperbase_status", (data) => {
      dispatch(setHyperbaseStatus({ status: data.status, timestamp: data.timestamp }));

      // Also refresh backend heartbeat
      dispatch(setBackendStatus({ status: "online", timestamp: data.timestamp }));

      clearTimeout(heartbeatTimerRef.current);
      heartbeatTimerRef.current = setTimeout(() => {
        dispatch(setBackendStatus({ status: "offline", timestamp: new Date().toISOString() }));
        dispatch(setHyperbaseStatus({ status: "unknown", timestamp: new Date().toISOString() }));
      }, HEARTBEAT_TIMEOUT);
    });

    return () => {
      clearTimeout(heartbeatTimerRef.current);
      socket.disconnect();
    };
  }, [dispatch]);
}
