"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function PaymentTest() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const programId = searchParams.get("programId");

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          programId,

          customerEmail: user.email,

          customerName: user.email.split("@")[0],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to create payment order.");
        return;
      }

      if (!window.Cashfree) {
        alert("Cashfree SDK not loaded.");
        return;
      }

      const cashfree = window.Cashfree({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION"
            ? "production"
            : "sandbox",
      });

      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment Error:", error);
      window.location.href = "/payment-failed";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>Complete Your Enrollment</h1>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <p>
          <strong>Program ID:</strong> {programId}
        </p>

        <p>
          <strong>Student:</strong>{" "}
          {user?.email || "Not Logged In"}
        </p>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}