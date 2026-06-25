"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function UpdatePassword() {
const router = useRouter();

const [password, setPassword] =
useState("");

const [confirmPassword, setConfirmPassword] =
useState("");

const [message, setMessage] =
useState("");

async function updatePassword() {
if (password !== confirmPassword) {
setMessage(
"Passwords do not match"
);
return;
}

const { error } =
  await supabase.auth.updateUser({
    password,
  });

if (error) {
  setMessage(error.message);
  return;
}

alert(
  "Password updated successfully"
);

router.push("/login");

}

return ( <div className="auth-page"> <h1>Set New Password</h1>

  <input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e) =>
      setPassword(
        e.target.value
      )
    }
  />

  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(
        e.target.value
      )
    }
  />

  <button
    onClick={updatePassword}
  >
    Update Password
  </button>

  <p>{message}</p>
</div>

);
}
