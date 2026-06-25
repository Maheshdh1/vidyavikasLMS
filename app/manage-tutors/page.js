"use client";

import { useState }
from "react";

export default function ManageTutors() {
  const [email, setEmail] =
    useState("");

  async function createTutor() {
    const res =
      await fetch(
        "/api/create-tutor",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

    const data =
      await res.json();

    alert(
      data.success
        ? "Tutor Created"
        : data.error
    );
  }

  return (
    <div className="page-container">
      <h1>
        Manage Tutors
      </h1>

      <input
        placeholder="Tutor Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <button
        onClick={createTutor}
      >
        Create Tutor
      </button>
    </div>
  );
}