import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

    const orderId = body.order_id;

    // Get program mapping
    const {
      data: orderProgram,
      error: orderProgramError,
    } = await supabaseAdmin
      .from("order_programs")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (orderProgramError) {
      throw orderProgramError;
    }

    // Get actual program details
    const {
      data: program,
      error: programError,
    } = await supabaseAdmin
      .from("programs")
      .select("*")
      .eq("id", orderProgram.program_id)
      .single();

    if (programError) {
      throw programError;
    }

    const { error } =
      await supabaseAdmin
        .from("enrollments")
        .insert({
          user_email:
            body.customer_email,

          user_name:
            body.customer_name,

          program_id:
            program.id,

          program_title:
            program.title,

          payment_order_id:
            orderId,

          payment_id:
            body.cf_order_id,

          status: "active",
        });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "CREATE ENROLLMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}