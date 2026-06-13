import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

        const { error } =
    await supabaseAdmin
    .from("payments")
    .upsert(
      [{
        order_id: body.order_id,
        cf_order_id: body.cf_order_id,
        customer_name:
          body.customer_name,
        customer_email:
          body.customer_email,
        customer_phone:
          body.customer_phone,
        amount: body.amount,
        payment_status:
          body.payment_status,
      }],
      {
        onConflict:
          "order_id",
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}