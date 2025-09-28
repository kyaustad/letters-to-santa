import type { Metadata } from "next";
import { Belanosima, Geist_Mono, Luxurious_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const belanosima = Belanosima({
  variable: "--font-belanosima",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const luxuriousScript = Luxurious_Script({
  variable: "--font-luxurious-script",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${geistMono.variable} ${belanosima.variable} ${luxuriousScript.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense
          fallback={
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          }
        >
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
