"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function MyCourses() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    loadData();
  }, [user]);

  async function loadData() {
    try {
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_email", user.email);

      setCourses(enrollments || []);

      const programIds = (enrollments || []).map(
        (item) => item.program_id
      );

      if (programIds.length > 0) {
        const { data: classData } = await supabase
          .from("class_sessions")
          .select("*")
          .eq("is_global", true)
          .order("class_time", {
            ascending: false,
          })
          .limit(1);

        setClasses(classData || []);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>Please login</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>My Courses</h1>

      {courses.length === 0 ? (
        <p>
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <>
          <h2>Enrolled Courses</h2>

          <div className="program-grid">
            {courses.map((course) => (
              <div
                key={course.id}
                className="program-card"
              >
                <h3>{course.program_title}</h3>

                <p>
                  Status: {course.status}
                </p>

                <p>
                  Email: {course.user_email}
                </p>
              </div>
            ))}
          </div>

          <h2
            style={{
              marginTop: "40px",
            }}
          >
            Latest Live Class
          </h2>

          {classes.length === 0 ? (
            <p>No class published yet.</p>
          ) : (
            <div className="program-grid">
              {classes.map((session) => (
                <div
                  key={session.id}
                  className="program-card"
                >
                  <h3>{session.class_title}</h3>

                  <p>
                    Course: {session.program_title}
                  </p>

                  <p>
                    Date:{" "}
                    {new Date(
                      session.class_time
                    ).toLocaleString()}
                  </p>

                  <a
                    href={session.meet_link}
                    target="_blank"
                    rel="noreferrer"
                    className="hero-btn"
                  >
                    Join Live Class
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}