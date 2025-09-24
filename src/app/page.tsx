"use client";
import { sendTestEmail } from "@/lib/emails";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/features/turnstile/components/turnstile";
import { verifyTurnstileToken } from "@/features/turnstile/actions";
import { useState } from "react";

export default function Home() {
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const handleVerifyTurnstile = async (token: string) => {
    const response = await verifyTurnstileToken(token);
    console.log("Turnstile response:", response);
    if (response.success) {
      setTurnstileVerified(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Letters From Santa</h1>
      <Turnstile
        onSuccess={handleVerifyTurnstile}
        onError={(error) => {
          console.log("Turnstile error:", error);
        }}
      />

      <Button onClick={sendTestEmail} disabled={!turnstileVerified}>
        Send Test Email
      </Button>
    </div>
  );
}
