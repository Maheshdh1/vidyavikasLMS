"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [orderId, setOrderId] = useState(null);
  const [status, setStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const currentOrderId =
      params.get("order_id");

    setOrderId(currentOrderId);

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `/api/verify-payment?order_id=${currentOrderId}`
        );

        const data = await res.json();

        console.log(
          "VERIFY RESPONSE:",
          data
        );

        if (
          data.order_status ===
          "PAID"
        ) {
          setPaymentData(data);
          setStatus("success");
        } else {
          window.location.href =
            `/payment-failed?order_id=${currentOrderId}`;
        }
      } catch (error) {
        console.error(
          "VERIFY ERROR:",
          error
        );

        window.location.href =
          `/payment-failed?order_id=${currentOrderId}`;
      }
    };

    if (currentOrderId) {
      verifyPayment();
    }
  }, []);

  if (status === "loading") {
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
        Verifying payment...
      </div>
    );
  }

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
        ✅ Payment Verified
      </h1>

      <p>
        Thank you for your payment.
      </p>

      <p>
        Order ID:
        {" "}
        <strong>
          {paymentData?.order_id}
        </strong>
      </p>

      <p>
        Status:
        {" "}
        <strong>
          {paymentData?.order_status}
        </strong>
      </p>

      <p>
        Amount:
        {" "}
        <strong>
          ₹{paymentData?.order_amount}
        </strong>
      </p>
    </div>
  );
}