"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
const router = useRouter();

const [fullName, setFullName] =
useState("");

const [mobile, setMobile] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [
confirmPassword,
setConfirmPassword,
] = useState("");

const [message, setMessage] =
useState("");

async function register() {
setMessage("");

if (
  password !==
  confirmPassword
) {
  setMessage(
    "Passwords do not match"
  );
  return;
}

const {
  data,
  error,
} = await supabase.auth.signUp({
  email,
  password,
});

if (error) {
  setMessage(error.message);
  return;
}

if (data.user) {
  const {
    error: profileError,
  } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      email,
      full_name:
        fullName,
      mobile_number:
        mobile,
      role: "student",
    });

  if (profileError) {
    setMessage(
      profileError.message
    );
    return;
  }
}

alert(
  "Registration successful. Please login."
);

router.push("/login");

}

return ( <div className="auth-page"> <h1>
Student Registration </h1>

  <input
    type="text"
    placeholder="Full Name"
    value={fullName}
    onChange={(e) =>
      setFullName(
        e.target.value
      )
    }
  />

  <input
    type="text"
    placeholder="Mobile Number"
    value={mobile}
    onChange={(e) =>
      setMobile(
        e.target.value
      )
    }
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
      setEmail(
        e.target.value
      )
    }
  />

  <input
    type="password"
    placeholder="Password"
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
    onClick={register}
  >
    Register
  </button>

  {message && (
    <p>{message}</p>
  )}

  <p>
    Already have an account?{" "}
    <a href="/login">
      Login
    </a>
  </p>
</div>
);
}
