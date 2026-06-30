import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request) {
try {
const body = await request.json();

const { error } =
  await supabaseAdmin
    .from("class_sessions")
    .insert({
      program_id:
        body.program_id,

      program_title:
        body.program_title,

      tutor_email:
        body.tutor_email,

      class_title:
        body.class_title,

      meet_link:
        body.meet_link,

      class_time:
        body.class_time,

      is_global:true,
    });

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
  {
    status: 500,
  }
);

}
}
