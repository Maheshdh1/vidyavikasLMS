"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPassword() {
const [email, setEmail] =
useState("");

const [message, setMessage] =
useState("");

async function sendResetLink() {
setMessage("");

const { error } =
  await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo:
        `${window.location.origin}/update-password`,
    }
  );

if (error) {
  setMessage(error.message);
  return;
}

setMessage(
  "Password reset email sent. Please check your inbox."
);

}

return ( <div className="auth-page"> <h1>Forgot Password</h1>

  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />
  <button
    onClick={sendResetLink}
  >
    Send Reset Link
  </button>

  {message && (
    <p>{message}</p>
  )}
</div>
);
}
