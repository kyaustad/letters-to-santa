"use client";

import { Loader2 } from "lucide-react";
//http://localhost:3000/payment-success?payment_intent=pi_&payment_intent_client_secret=pi_&redirect_status=succeeded

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  if (redirectStatus !== "succeeded" && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <h1 className="text-4xl font-bold text-destructive">Payment Failed</h1>
        <p className="text-lg">Please try again.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
      <h1 className="text-4xl font-bold text-secondary">Payment Successful</h1>
      <p className="text-lg">Thank you for your purchase!</p>
    </div>
  );
}
