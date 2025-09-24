"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-8 justify-center h-screen">
      <Image src="/logo.webp" alt="Logo" width={100} height={100} />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg font-light">{`Looks like Santa's sleigh has taken a detour and got lost.`}</p>
      <div className="flex flex-row gap-4 items-center mx-auto">
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
          Go Back
        </Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          <HomeIcon className="size-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
