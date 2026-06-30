"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function PaymentTest() {
  const searchParams = useSearchParams();

  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const programId =
    searchParams.get("programId");

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function loadProfile() {
    const { data, error } =
      await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (error) {
      console.error(error);
    } else {
      setProfile(data);
    }

    setLoading(false);
  }

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!profile) {
      alert("Unable to load your profile.");
      return;
    }

    try {
      const res = await fetch(
        "/api/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            programId,

            customerEmail:
              profile.email,

            customerName:
              profile.full_name,

            customerPhone:
              profile.mobile_number,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Unable to create payment order."
        );
        return;
      }

      if (!window.Cashfree) {
        alert(
          "Cashfree SDK not loaded."
        );
        return;
      }

      const cashfree =
        window.Cashfree({
          mode:
            process.env
              .NEXT_PUBLIC_CASHFREE_ENV ===
            "PRODUCTION"
              ? "production"
              : "sandbox",
        });

      await cashfree.checkout({
        paymentSessionId:
          data.payment_session_id,

        redirectTarget:
          "_self",
      });
    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      window.location.href =
        "/payment-failed";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        minHeight: "100vh",
        flexDirection:
          "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>
        Complete Your Enrollment
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <p>
          <strong>
            Program ID:
          </strong>{" "}
          {programId}
        </p>

        <p>
          <strong>
            Student:
          </strong>{" "}
          {profile?.full_name}
        </p>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {profile?.email}
        </p>

        <button
          onClick={
            handlePayment
          }
          style={{
            width: "100%",
            marginTop:
              "20px",
            padding:
              "14px",
            border:
              "none",
            borderRadius:
              "10px",
            background:
              "#2563eb",
            color:
              "#fff",
            fontSize:
              "16px",
            fontWeight:
              "600",
            cursor:
              "pointer",
          }}
        >
          Proceed to
          Payment
        </button>
      </div>
    </div>
  );
}