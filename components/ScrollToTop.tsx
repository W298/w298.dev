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
    active && (
      <div
        className="fixed bottom-7 right-7 z-10 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer transition bg-layer-300 hover:bg-layer-200"
        title="Move to top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ChevronUpIcon size={24} className="w-7 h-7" />
      </div>
    )
  );
}
