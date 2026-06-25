"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function PaymentTest() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const programId =
    searchParams.get("programId");

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
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
              user.email,

            customerName:
              user.email.split("@")[0],
          }),
        }
      );

      const data =
        await res.json();

      const cashfree =
        window.Cashfree({
          mode: "sandbox",
        });

      await cashfree.checkout({
        paymentSessionId:
          data.payment_session_id,

        redirectTarget:
          "_self",
      });
    } catch (error) {
      console.error(error);

      window.location.href =
        "/payment-failed";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        height: "100vh",
        flexDirection:
          "column",
        gap: "20px",
      }}
    >
      <h2>
        Program ID:
        {" "}
        {programId}
      </h2>

      <p>
        Logged in as:
        {" "}
        {user?.email}
      </p>

      <button
        onClick={handlePayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
}