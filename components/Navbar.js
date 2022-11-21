"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MarkGithubIcon, AppsIcon } from "@primer/octicons-react";

export default function Navbar() {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  return (
    <div className="sticky top-0 py-3 px-8 backdrop-blur-sm bg-layer-400/70 drop-shadow">
      <div className="max-w-[90rem] m-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-8 min-[1000px]:w-80 border-r border-layer-200 max-[1000px]:border-transparent">
              <img
                src="https://avatars.githubusercontent.com/u/25034289?v=4"
                className="w-8 h-8"
              ></img>
              <Link
                className="text-[1.2rem] cursor-pointer font-black"
                href="/"
              >
                W298.me
              </Link>
            </div>
            <div className="flex flex-row items-center gap-3 max-[1000px]:hidden">
              {pageList.map(({ title, path }) => {
                return (
                  <Link
                    key={`Link-${title}`}
                    className={`text-sm ${
                      path == pathname
                        ? "bg-layer-200 font-bold"
                        : "bg-layer-300"
                    } px-4 py-0.5 border border-transparent rounded hover:border-layer-100 cursor-pointer transition`}
                    href={path}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <a href="https://github.com/W298" target="_blank" className="p-1">
              <MarkGithubIcon fill="#f4f4f4" size={18} />
            </a>
            <div className="p-1 cursor-pointer">
              <AppsIcon fill="#f4f4f4" size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
