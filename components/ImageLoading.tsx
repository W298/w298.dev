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
  top = "50%",
  type = "dot-bricks",
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
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition duration-150`}
      />
      <div
        className={`w-full absolute flex justify-center transition duration-150 ${
          isLoaded ? "hidden" : ""
        }`}
        style={{ top }}
      >
        <div className={type}></div>
      </div>
    </div>
  );
}
