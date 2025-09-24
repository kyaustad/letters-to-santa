import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { HeroText } from "@/features/hero/components/hero-text";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <HeroText />
      <Separator className="w-full" />
    </div>
  );
}
