"use client";

export default function PaymentTest() {
  const handlePayment = async () => {
    try {
      const res = await fetch(
        "/api/create-order",
        {
          method: "POST",
        }
      );

      const data =
        await res.json();

      const cashfree =
        window.Cashfree({
          mode: "sandbox",
        });

      const result =
        await cashfree.checkout({
          paymentSessionId:
            data.payment_session_id,

          redirectTarget:
            "_self",
        });

      console.log(
        "CHECKOUT RESULT:",
        result
      );

    } catch (error) {
      console.error(
        "CHECKOUT ERROR:",
        error
      );

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
      }}
    >
      <button
        onClick={handlePayment}
        style={{
          padding:
            "12px 24px",
          fontSize:
            "18px",
          cursor:
            "pointer",
        }}
      >
        Pay ₹100
      </button>
    </div>
  );
}