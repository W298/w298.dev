"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import pageData from "../data/pageData.json";

export default function DropdownNav({ open, setOpen, menuBtnRef }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      )
        setOpen(false);
    };

    const handleEsc = (event) => {
      if (event.keyCode == 27) setOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [ref]);

  return (
    <div
      className={`absolute top-[44px] right-0 w-72 bg-layer-350 ${
        open ? "" : "hidden"
      }`}
      ref={ref}
    >
      <div className="py-4">
        <div className="px-5">
          <div className="text-text-secondary text-sm">Pages</div>
          <div className="my-2 bg-layer-200 w-full h-[1px]"></div>
        </div>

        {pageData.map(({ title, dir }) => {
          return (
            <Link
              key={`dropdown-${title}`}
              href={dir}
              onClick={() => {
                setOpen(false);
              }}
              className="block py-[0.4rem] px-5 cursor-pointer text-text-secondary font-semibold hover:bg-layer-300 hover:text-text-primary transition"
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
