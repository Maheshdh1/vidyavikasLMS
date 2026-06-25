import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

export async function POST(request) {
  try {
    const body = await request.json();

    const programId =
      Number(body.programId);

    const orderId =
      `ORDER_${Date.now()}`;

    const response =
      await cashfree.PGCreateOrder({
        order_id: orderId,

        order_amount: 100,

        order_currency: "INR",

        customer_details: {
          customer_id:
            `cust_${Date.now()}`,
                
          customer_name:
            body.customerName,
                
          customer_email:
            body.customerEmail,
                
          customer_phone:
            "9999999999",
        },

        order_meta: {
          return_url:
            "http://localhost:3000/payment-success?order_id={order_id}",
        },
      });

    const { error } =
      await supabaseAdmin
        .from("order_programs")
        .insert({
          order_id: orderId,
          program_id: programId,
        });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      response.data
    );
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}