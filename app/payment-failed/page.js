"use client";

import { useEffect, useState } from "react";

export default function PaymentFailed() {
  const [orderId, setOrderId] =
    useState(null);

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    setOrderId(
      params.get("order_id")
    );
  }, []);

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
        Payment was not
        completed.
      </p>

      <p>
        No amount has been
        charged.
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
          (window.location.href =
            "/payment-test")
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