"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function TutorDashboard() {
  const {
    user,
    profile,
  } = useAuth();

  const [programs, setPrograms] =
    useState([]);

  const [
    publishToAll,
    setPublishToAll,
  ] = useState(false);

  const [form, setForm] =
    useState({
      program_id: "",
      program_title: "",
      class_title: "",
      meet_link: "",
      class_time: "",
    });

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    const { data } =
      await supabase
        .from("programs")
        .select("*")
        .order("id");

    setPrograms(data || []);
  }

  async function publishClass() {
    if (
      !form.class_title ||
      !form.meet_link ||
      !form.class_time
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    let programsToPublish =
      [];

    if (publishToAll) {
      programsToPublish =
        programs.filter(
          (p) =>
            p.id >= 1 &&
            p.id <= 7
        );
    } else {
      const selectedProgram =
        programs.find(
          (p) =>
            Number(p.id) ===
            Number(
              form.program_id
            )
        );

      if (
        !selectedProgram
      ) {
        alert(
          "Please select a program"
        );
        return;
      }

      programsToPublish =
        [selectedProgram];
    }

    try {
      for (const program of programsToPublish) {
        const response =
          await fetch(
            "/api/create-class-session",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    ...form,

                    program_id:
                      program.id,

                    program_title:
                      program.title,

                    tutor_email:
                      user.email,
                  }
                ),
            }
          );

        const data =
          await response.json();

        if (
          !data.success
        ) {
          throw new Error(
            "Failed to publish class"
          );
        }
      }

      alert(
        publishToAll
          ? "Class Published For All Entrance Courses"
          : "Class Published Successfully"
      );

      setForm({
        program_id: "",
        program_title: "",
        class_title: "",
        meet_link: "",
        class_time: "",
      });

      setPublishToAll(
        false
      );
    } catch (error) {
      console.error(
        error
      );

      alert(
        "Failed to publish class"
      );
    }
  }

  if (!user) {
    return (
      <h2>
        Please Login
      </h2>
    );
  }

  if (
    profile?.role !==
      "tutor" &&
    profile?.role !==
      "admin"
  ) {
    return (
      <h2>
        Access Denied
      </h2>
    );
  }

  return (
    <div className="page-container">
      <h1>
        Tutor Dashboard
      </h1>

      <div className="form-card">
        <select
          disabled={
            publishToAll
          }
          value={
            form.program_id
          }
          onChange={(e) =>
            setForm({
              ...form,
              program_id:
                e.target
                  .value,
            })
          }
        >
          <option value="">
            Select Program
          </option>

          {programs.map(
            (program) => (
              <option
                key={
                  program.id
                }
                value={
                  program.id
                }
              >
                {
                  program.title
                }
              </option>
            )
          )}
        </select>

        <label
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap: "10px",
            margin:
              "15px 0",
          }}
        >
          <input
            type="checkbox"
            checked={
              publishToAll
            }
            onChange={(
              e
            ) =>
              setPublishToAll(
                e.target
                  .checked
              )
            }
          />

          Publish to All
          Entrance Courses
          (JEE, NEET,
          EAMCET,
          BITSAT,
          COMEDK,
          UGEE, IISER)
        </label>

        <input
          placeholder="Class Title"
          value={
            form.class_title
          }
          onChange={(e) =>
            setForm({
              ...form,
              class_title:
                e.target
                  .value,
            })
          }
        />

        <input
          placeholder="Google Meet Link"
          value={
            form.meet_link
          }
          onChange={(e) =>
            setForm({
              ...form,
              meet_link:
                e.target
                  .value,
            })
          }
        />

        <input
          type="datetime-local"
          value={
            form.class_time
          }
          onChange={(e) =>
            setForm({
              ...form,
              class_time:
                e.target
                  .value,
            })
          }
        />

        <button
          className="hero-btn"
          onClick={
            publishClass
          }
        >
          Publish Class
        </button>
      </div>
    </div>
  );
}