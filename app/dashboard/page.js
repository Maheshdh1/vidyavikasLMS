"use client";

import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      window.location.href =
        "/login";
      return;
    }

    if (
      profile?.role ===
      "admin"
    ) {
      window.location.href =
        "/admin";
    } else if (
      profile?.role ===
      "tutor"
    ) {
      window.location.href =
        "/tutor-dashboard";
    } else {
      window.location.href =
        "/my-courses";
    }
  }, [
    user,
    profile,
    loading,
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        fontSize: "20px",
      }}
    >
      Loading Dashboard...
    </div>
  );
}