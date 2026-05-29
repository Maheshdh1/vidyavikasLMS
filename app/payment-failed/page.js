"use client";

import { useSearchParams }
from "next/navigation";

export default function
PaymentFailed() {

  const searchParams =
    useSearchParams();

  const orderId =
    searchParams.get("order_id");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        flexDirection:
          "column",
        fontFamily:
          "Arial",
      }}
    >
      <h1>
        ❌ Payment Failed
      </h1>

      <p>
        Your payment could
        not be completed.
      </p>

      {orderId && (
        <p>
          Order ID:
          {" "}
          <strong>
            {orderId}
          </strong>
        </p>
      )}

      <button
        onClick={() =>
          window.location.href =
            "/payment-test"
        }
        style={{
          padding:
            "10px 20px",
          marginTop: 20,
          cursor:
            "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}