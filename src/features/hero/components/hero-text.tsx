"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export const HeroText = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <h1 className="text-4xl font-script text-primary">Letters From Santa</h1>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full ">
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
              Letters From Santa
            </textPath>
          </text>
        </svg>
        {/* center the logo right below the text in the middle of the curve */}
        {/* <div className="absolute top-38 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={100}
              height={100}
              className=""
              priority
            />
          </div> */}
      </div>
    </div>
  );
};
