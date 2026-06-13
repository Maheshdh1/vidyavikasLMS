import { supabase } from "./supabase";

export async function getPrograms() {
  const { data, error } = await supabase
    .from("programs")
    .select("*");

  console.log("Programs data:", data);
  console.log("Programs error:", error);

  if (error) {
    throw error;
  }

  return data;
}