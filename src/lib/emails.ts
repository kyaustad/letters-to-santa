"use server";

import { Resend } from "resend";
import { env } from "@/env";

export const sendTestEmail = async () => {
  const resend = new Resend(env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from: "Letters From Santa <no-reply@santa.kyleaustad.com>",
    to: "kyle@kyleaustad.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  return response;
};
