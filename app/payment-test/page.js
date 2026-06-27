"use client";

import { Suspense } from "react";
import PaymentTest from "./PaymentTest";

export default function Page() {
  return (
    <Suspense fallback={<h2>Loading Payment...</h2>}>
      <PaymentTest />
    </Suspense>
  );
}