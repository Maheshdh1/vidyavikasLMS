import {
  NextResponse,
} from "next/server";

import {
  supabaseAdmin,
} from "../../../lib/supabase-admin";

export async function POST(
  request
) {
  try {
    const body =
      await request.json();

    const { error } =
      await supabaseAdmin
        .from("profiles")
        .update({
          role: "tutor",
        })
        .eq(
          "email",
          body.email
        );

    if (error)
      throw error;

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error.message,
      }
    );
  }
}