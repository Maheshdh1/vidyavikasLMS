"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [orderId, setOrderId] =
    useState(null);

  const [status, setStatus] =
    useState("loading");

  const [paymentData, setPaymentData] =
    useState(null);

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const currentOrderId =
      params.get("order_id");

    setOrderId(currentOrderId);

    const verifyPayment =
      async () => {
        try {
          const res =
            await fetch(
              `/api/verify-payment?order_id=${currentOrderId}`
            );

          const data =
            await res.json();

          console.log(
            "VERIFY RESPONSE:",
            data
          );

          if (
            data.order_status ===
            "PAID"
          ) {
            console.log(
              "Enrollment payload",
              {
                order_id:
                  data.order_id,
                customer_email:
                  data
                    .customer_details
                    ?.customer_email,
                customer_name:
                  data
                    .customer_details
                    ?.customer_name,
              }
            );

            console.log(
              "Customer Details:",
              data.customer_details
            );

            await fetch(
              "/api/create-enrollment",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  order_id:
                    data.order_id,

                  cf_order_id:
                    data.cf_order_id,

                  customer_name:
                    data
                      .customer_details
                      ?.customer_name,

                  customer_email:
                    data
                      .customer_details
                      ?.customer_email,
                }),
              }
            );

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

  useEffect(() => {
    if (status === "success") {
      const timer =
        setTimeout(() => {
          window.location.href =
            "/my-courses";
        }, 3000);

      return () =>
        clearTimeout(timer);
    }
  }, [status]);

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
        Thank you for your
        payment.
      </p>

      <p>
        Order ID:{" "}
        <strong>
          {paymentData?.order_id}
        </strong>
      </p>

      <p>
        Status:{" "}
        <strong>
          {
            paymentData?.order_status
          }
        </strong>
      </p>

      <p>
        Amount:{" "}
        <strong>
          ₹
          {
            paymentData?.order_amount
          }
        </strong>
      </p>

      <p
        style={{
          marginTop:
            "20px",
          color: "green",
          fontWeight:
            "bold",
        }}
      >
        Redirecting to My
        Courses...
      </p>
    </div>
  );
}