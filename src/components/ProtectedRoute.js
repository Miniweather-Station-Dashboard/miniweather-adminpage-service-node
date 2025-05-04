"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
  requireVerification = true,
}) {
  const router = useRouter();
  const { accessToken, verification, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) return; 
    
    if (!accessToken) {
      router.push("/login");
      return;
    }
    if (requireVerification && verification.status === "pending") {
      router.push("/verifycode");
      return;
    }
    
  }, [accessToken, verification.status, isLoading, router, requireVerification]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  if (!accessToken) {
    return null; // Will redirect from useEffect
  }

  if (requireVerification && verification.status === "pending") {
    return null; // Will redirect from useEffect
  }

  return <>{children}</>;
}