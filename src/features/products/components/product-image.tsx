"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ProductImage = ({
  image,
  width = 500,
  height = 700,
  className,
  imageClassName,
}: {
  image: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  if (imageError) {
    return (
      <div
        className={cn(
          "aspect-[3/4] bg-gradient-to-br rounded-t-xl from-primary/20 to-secondary/20  flex items-center justify-center group overflow-hidden",
          className,
        )}
      >
        <div className="text-center p-6 group-hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🎄</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Image Not Available Right Now
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "aspect-[3/4] rounded-t-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group overflow-hidden",
        className,
      )}
    >
      <Image
        src={image}
        alt="Preview Image"
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setImageError(false)}
        onError={() => setImageError(true)}
        className={cn(
          "object-cover shadow-xl drop-shadow-lg rounded-md max-w-[90%] max-h-[90%] min-w-[90%] min-h-[90%] group-hover:scale-105 transition-all duration-300",
          imageClassName,
        )}
      />
    </div>
  );
};
