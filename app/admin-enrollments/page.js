"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function AdminEnrollments() {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  const [
    enrollments,
    setEnrollments,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  const [
    loadingData,
    setLoadingData,
  ] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  async function loadEnrollments() {
    const { data, error } =
      await supabase
        .from("enrollments")
        .select("*")
        .order(
          "enrolled_at",
          {
            ascending: false,
          }
        );

    if (!error) {
      setEnrollments(
        data || []
      );
    }

    setLoadingData(false);
  }

  if (loading) {
    return (
      <div className="page-container">
        <h2>
          Loading...
        </h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>
          Please Login
        </h2>
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

  const filtered =
    enrollments.filter(
      (item) =>
        item.user_email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.user_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.program_title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="page-container">
      <h1>
        Student Enrollments
      </h1>

      <p>
        Total Enrollments:
        {" "}
        <strong>
          {
            enrollments.length
          }
        </strong>
      </p>

      <input
        type="text"
        placeholder="Search by student, email or course..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom:
            "20px",
        }}
      />

      {loadingData ? (
        <h3>
          Loading...
        </h3>
      ) : filtered.length ===
        0 ? (
        <h3>
          No enrollments
          found
        </h3>
      ) : (
        <div className="program-grid">
          {filtered.map(
            (
              enrollment
            ) => (
              <div
                key={
                  enrollment.id
                }
                className="program-card"
              >
                <h3>
                  {
                    enrollment.user_name
                  }
                </h3>

                <p>
                  <strong>
                    Email:
                  </strong>
                  {" "}
                  {
                    enrollment.user_email
                  }
                </p>

                <p>
                  <strong>
                    Course:
                  </strong>
                  {" "}
                  {
                    enrollment.program_title
                  }
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>
                  {" "}
                  {
                    enrollment.status
                  }
                </p>

                <p>
                  <strong>
                    Order:
                  </strong>
                  {" "}
                  {
                    enrollment.payment_order_id
                  }
                </p>

                <p>
                  <strong>
                    Enrolled:
                  </strong>
                  {" "}
                  {new Date(
                    enrollment.enrolled_at
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}