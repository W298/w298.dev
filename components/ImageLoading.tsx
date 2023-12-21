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
  isFull = false
}) {
  const [isLoaded, setIsLoaded] = useState(0);

  return (
    <div className="relative h-full">
      {isLoaded == -1 ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-[12rem] font-black text-[#161616] pt-2">404</div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          loading={loading}
          quality={quality}
          unoptimized={unoptimized}
          width={parseInt(width)}
          height={parseInt(height)}
          onLoadingComplete={() => {
            setIsLoaded(1);
          }}
          onError={() => {
            setIsLoaded(-1);
          }}
          className={`${className} ${
            isLoaded == 1 ? "opacity-100" : "opacity-0"
          } transition duration-150 ${isFull ? "w-full" : ""}`}
        />
      )}
      <div
        className={`w-full absolute flex justify-center transition duration-150 ${
          isLoaded == 1 || isLoaded == -1 ? "hidden" : ""
        }`}
        style={{ top }}
      >
        <div className={type}></div>
      </div>
    </div>
  );
}
