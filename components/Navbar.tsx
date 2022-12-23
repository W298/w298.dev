"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import pageData from "../data/pageData.json";
import { MarkGithubIcon, AppsIcon } from "@primer/octicons-react";

export default function Navbar() {
  const pathname: string = usePathname() ?? "/";

  return (
    <div className="sticky top-0 py-3 px-8 backdrop-blur-sm bg-layer-400/70 drop-shadow z-10">
      <div className="max-w-[90rem] m-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-8 min-[1440px]:w-80 max-[1440px]:w-[18rem] max-sm:w-fit border-r border-layer-200 max-[1000px]:border-transparent">
              <img
                src="https://avatars.githubusercontent.com/u/25034289?v=4"
                className="w-8 h-8"
              ></img>
              <Link
                className="text-[1.2rem] cursor-pointer font-black"
                href="/projects"
              >
                W298.me
              </Link>
            </div>
            <div className="flex flex-row items-center gap-3 max-[1000px]:hidden">
              {pageData.map(({ title, path }) => {
                return (
                  <Link
                    key={`Link-${title}`}
                    className={`text-sm ${
                      path == pathname
                        ? "bg-layer-200 font-bold"
                        : "bg-layer-300"
                    } w-[5.5rem] h-[1.7rem] flex justify-center items-center rounded-sm border border-transparent hover:border-layer-100 cursor-pointer transition`}
                    href={path}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <a
              title="Github Profile"
              href="https://github.com/W298"
              target="_blank"
              className="h-[1.7rem] px-3 rounded-sm flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition"
            >
              <MarkGithubIcon fill="#c6c6c6" size={17} />
              <span className="font-bold text-sm text-text-secondary max-sm:hidden">
                Github
              </span>
            </a>
            <div
              title="Menu"
              className="h-[1.7rem] px-3 rounded-sm flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition cursor-pointer"
            >
              <AppsIcon fill="#c6c6c6" size={17} />
              <span className="font-bold text-sm text-text-secondary max-sm:hidden">
                Menu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
