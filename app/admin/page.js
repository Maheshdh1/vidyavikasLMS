"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminPage() {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>Please login</h2>
      </div>
    );
  }

  if (
    profile?.role !==
    "admin"
  ) {
    return (
      <div className="page-container">
        <h2>
          Access Denied
        </h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>
        Admin Dashboard
      </h1>

      <div className="program-grid">
        <Link
          href="/manage-tutors"
          className="hero-btn"
        >
          Manage Tutors
        </Link>

        <Link
          href="/tutor-dashboard"
          className="hero-btn"
        >
          Tutor Dashboard
        </Link>
      </div>
    </div>
  );
}