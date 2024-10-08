"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import _pageData from "../data/pageData.json";

interface PageInfo {
  title: string;
  dir: string;
}

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const pathname: string =
    "/" +
      usePathname()
        .split("/")
        .filter((c) => c != "")[0] ?? "/";
  const pageData: PageInfo[] = _pageData;

  return (
    <div className="fixed w-[19rem] h-full max-[900px]:hidden ml-2">
      <div className="text-md font-semibold py-5 px-6">
        <Link href={pathname} className="flex flex-1">
          {pageData.find(({ dir }) => dir == pathname).title}
        </Link>
      </div>
      {children}
    </div>
  );
}
