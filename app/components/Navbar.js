"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const { user } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Vidya Vikas Academy
        </Link>
      </div>

      <div className="nav-links">

        <Link href="/">
          Home
        </Link>

        <Link href="/programs">
          Programs
        </Link>

        {user ? (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}