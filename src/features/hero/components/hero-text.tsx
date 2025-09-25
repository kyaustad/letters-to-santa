"use client";

import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroText = ({
  title = "Letters From Santa",
}: {
  title: string;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={150}
          height={150}
          className="p-0 m-0"
          priority
        />
        <h1 className="text-5xl font-script text-primary">{title}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <Image
        src="/logo.webp"
        alt="Logo"
        width={150}
        height={150}
        className="p-0 m-0"
        priority
      />
      <div className="curved-text-container w-full">
        <svg viewBox="0 0 1000 200" className="w-full h-48 md:h-48 sm:h-32">
          <defs>
            <path
              id="curve"
              d="M 100 150 Q 500 20 900 150"
              fill="transparent"
            />
          </defs>
          <text className="font-script fill-primary">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              {title}
            </textPath>
          </text>
        </svg>
        {/* center the logo right below the text in the middle of the curve */}
        {/* <div className="absolute top-38 left-1/2 -translate-x-1/2 -translate-y-1/2">
           
          </div> */}
      </div>
    </div>
  );
};
