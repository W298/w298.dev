"use client";

import { useState } from "react";
import Image from "next/image";

import "../styles/loading.css";

export default function ImageLoading({
  src,
  alt,
  loading,
  quality,
  unoptimized,
  width,
  height,
  className,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        loading={loading}
        quality={quality}
        unoptimized={unoptimized}
        width={parseInt(width)}
        height={parseInt(height)}
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`w-full absolute flex justify-center top-[50%] ${
          isLoaded ? "hidden" : ""
        }`}
      >
        <div className="dot-bricks"></div>
      </div>
    </div>
  );
}
