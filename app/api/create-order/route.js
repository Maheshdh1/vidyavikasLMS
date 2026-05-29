import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

export async function POST() {
  try {
    const orderId = `ORDER_${Date.now()}`;

    const response = await cashfree.PGCreateOrder({
      order_id: orderId,
      order_amount: 100,
      order_currency: "INR",

      customer_details: {
        customer_id: "cust_001",
        customer_name: "Mahesh",
        customer_email: "mahesh@test.com",
        customer_phone: "9999999999",
      },

      order_meta: {
        return_url:
          "http://localhost:3000/payment-success?order_id={order_id}",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}