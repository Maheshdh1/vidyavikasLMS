import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";
import { supabaseAdmin }
from "@/lib/supabase-admin";

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderId =
      searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing order id" },
        { status: 400 }
      );
    }

      const response =
        await cashfree.PGFetchOrder(
          orderId
        );
      
        const order =
    response.data;
        
    if (
      order.order_status ===
      "PAID"
    ) {
      await supabaseAdmin
        .from("payments")
        .upsert(
          [{
            order_id:
              order.order_id,
          
            cf_order_id:
              order.cf_order_id,
          
            customer_name:
              order.customer_details
                ?.customer_name,
          
            customer_email:
              order.customer_details
                ?.customer_email,
          
            customer_phone:
              order.customer_details
                ?.customer_phone,
          
            amount:
              order.order_amount,
          
            payment_status:
              order.order_status,
          }],
          {
            onConflict:
              "order_id",
          }
        );
    }

    return NextResponse.json(
      response.data
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Verification failed",
      },
      { status: 500 }
    );
  }
}