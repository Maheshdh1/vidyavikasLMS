"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
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

  const [status, setStatus] =
    useState("loading");

  const [paymentData,
    setPaymentData] =
    useState(null);

  useEffect(() => {
    const verifyPayment =
      async () => {
        try {
          const res =
            await fetch(
              `/api/verify-payment?order_id=${orderId}`
            );

          const data =
            await res.json();

          if (
            data.order_status ===
            "PAID"
          ) {
            setStatus(
              "success"
            );

            setPaymentData(
              data
            );
          } else {
            window.location.href =
              `/payment-failed?order_id=${orderId}`;
          }
        } catch (error) {
          console.error(error);

          window.location.href =
            `/payment-failed?order_id=${orderId}`;
        }
      };

    if (orderId) {
      verifyPayment();
    }
  }, [orderId]);

  if (status === "loading") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        Verifying payment...
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>
        ✅ Payment Verified
      </h1>

      <p>
        Order ID:
      </p>

      <strong>
        {paymentData.order_id}
      </strong>

      <p
        style={{
          marginTop: 20,
        }}
      >
        Status:
        {" "}
        {
          paymentData.order_status
        }
      </p>
    </div>
  );
}