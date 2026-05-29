import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
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