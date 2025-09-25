"use server";

import { env } from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function createPaymentIntent({
  amount,
}: {
  amount: number;
}): Promise<string | null> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return null;
  }
}
