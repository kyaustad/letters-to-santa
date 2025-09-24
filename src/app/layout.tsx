import type { Metadata } from "next";
import { Belanosima, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const belanosima = Belanosima({
  variable: "--font-belanosima",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Letters From Santa",
  description: "Get a custom letter from Santa Claus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistMono.variable} ${belanosima.variable} antialiased transition-all duration-500`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
