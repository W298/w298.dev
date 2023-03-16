"use client";

import { ChevronUpIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = () => {
      setActive(window.scrollY / document.body.scrollHeight >= 0.2);
    };

    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-7 right-7 z-10 w-12 h-12 flex justify-center items-center rounded-full transition duration-200 bg-layer-300 hover:bg-layer-200 ${
        active ? "opacity-100 cursor-pointer" : "opacity-0 cursor-default"
      }`}
      onClick={() => {
        if (!active) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <ChevronUpIcon size={24} className="w-7 h-7" />
    </div>
  );
}
