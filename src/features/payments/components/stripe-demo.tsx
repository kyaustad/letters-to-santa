"use client";

import { env } from "@/env";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const StripeDemo = () => {
  const AMOUNT = 49.99;
  const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 w-full">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(AMOUNT),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={AMOUNT} />
      </Elements>
    </main>
  );
};

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getClientSecret = async () => {
    setLoading(true);
    try {
      const secret = await createPaymentIntent({
        amount: convertToSubcurrency(amount),
      });
      setClientSecret(secret);
    } catch (error) {
      setError("Failed to create payment intent");
      console.error("Error creating payment intent:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientSecret();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message ?? "An error occurred");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "An error occurred");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-8 bg-white p-4 rounded-lg"
    >
      {clientSecret && <PaymentElement />}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      <Button
        disabled={!stripe || loading || !clientSecret}
        variant="secondary"
        className="text-white w-full p-10 bg-black mt-2 rounded-lg text-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse disabled:text-white"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
};
