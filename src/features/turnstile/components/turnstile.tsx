"use client";

import { useEffect, useRef } from "react";
import { env } from "@/env";
import { useTheme } from "next-themes";

export function Turnstile({
  onSuccess,
  onError,
}: {
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
}) {
  const currentTheme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate unique callback names to avoid conflicts
    const callbackId = Math.random().toString(36).substring(7);
    const successCallbackName = `turnstileSuccess_${callbackId}`;
    const errorCallbackName = `turnstileError_${callbackId}`;

    // Make callbacks globally accessible
    (window as any)[successCallbackName] = (token: string) => {
      console.log("Turnstile success:", token);
      onSuccess(token);
      // Clean up global callback
      delete (window as any)[successCallbackName];
      delete (window as any)[errorCallbackName];
    };

    (window as any)[errorCallbackName] = (error: string) => {
      console.log("Turnstile error:", error);
      onError(error);
      // Clean up global callback
      delete (window as any)[successCallbackName];
      delete (window as any)[errorCallbackName];
    };

    // Set the callback names on the container
    if (containerRef.current) {
      containerRef.current.setAttribute("data-callback", successCallbackName);
      containerRef.current.setAttribute(
        "data-error-callback",
        errorCallbackName,
      );
      if (currentTheme.theme === "dark") {
        containerRef.current.setAttribute("data-theme", "dark");
      }
      if (currentTheme.theme === "light") {
        containerRef.current.setAttribute("data-theme", "light");
      }
    }

    // Load Turnstile Script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        "script[src='https://challenges.cloudflare.com/turnstile/v0/api.js']",
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }

      // Clean up global callbacks
      delete (window as any)[successCallbackName];
      delete (window as any)[errorCallbackName];
    };
  }, [onSuccess, onError, currentTheme.theme]);

  return (
    <div
      ref={containerRef}
      className="cf-turnstile"
      data-theme={"dark"}
      data-sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
    ></div>
  );
}
