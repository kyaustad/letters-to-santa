"use server";

import { env } from "@/env";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
}

export async function verifyTurnstileToken(token: string) {
  try {
    const response = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );

    const data: TurnstileResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return { success: false, "error-codes": ["internal_error"] };
  }
}
