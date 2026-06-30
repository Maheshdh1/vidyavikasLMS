import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION,
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

    // Fetch actual program price
    const {
      data: program,
      error: programError,
    } = await supabaseAdmin
      .from("programs")
      .select("price")
      .eq("id", programId)
      .single();

    if (
      programError ||
      !program
    ) {
      throw new Error(
        "Program not found."
      );
    }

    const response =
      await cashfree.PGCreateOrder({
        order_id: orderId,

        order_amount:
          Number(program.price),

        order_currency: "INR",

        customer_details: {
          customer_id:
            `cust_${Date.now()}`,

          customer_name:
            body.customerName,

          customer_email:
            body.customerEmail,

          customer_phone:
            body.customerPhone,
        },

        order_meta: {
          return_url:
            "https://www.vidyavikasacademy.online/payment-success?order_id={order_id}",
        },
      });

    const { error } =
      await supabaseAdmin
        .from("order_programs")
        .insert({
          order_id:
            orderId,

          program_id:
            programId,
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
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}