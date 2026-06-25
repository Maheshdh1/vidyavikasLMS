"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [message, setMessage] =
useState("");

async function login() {
setMessage("");
const { error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

if (error) {
  setMessage(error.message);
  return;
}

router.push("/");
}

return ( <div className="auth-page"> <h1>Login</h1>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <button onClick={login}>
    Login
  </button>

  {message && (
    <p>{message}</p>
  )}

  <p>
    <a href="/forgot-password">
      Forgot Password?
    </a>
  </p>

  <p>
    New Student?{" "}
    <a href="/register">
      Register Here
    </a>
  </p>
</div>
);
}
