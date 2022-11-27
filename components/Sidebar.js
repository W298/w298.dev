"use client";

import { usePathname } from "next/navigation";
import { pageData } from "../data/pageData";

export default function Sidebar({ children }) {
  const pathname = usePathname();

  return (
    <div className="fixed top-[0.9rem] pt-12 w-80 h-full bg-layer-350 drop-shadow max-[700px]:hidden">
      <div className="text-xl font-semibold pb-4 pt-8 px-8">
        {pageData.find(({ path }) => path == pathname).title}
      </div>
      {children}
    </div>
  );
}
