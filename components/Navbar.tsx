"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import pageData from "../data/pageData.json";
import { MarkGithubIcon, AppsIcon } from "@primer/octicons-react";
import { useRef, useState } from "react";
import DropdownNav from "./DropdownNav";
import { Youtube } from "@icons-pack/react-simple-icons";
import localFont from "next/font/local";

const IBM = localFont({
  src: "../fonts/Web437_IBM_BIOS.woff",
  display: "swap",
});

export default function Navbar() {
  const pathname: string = usePathname() ?? "/";
  const [dropdownNavOpen, setDropdownNavOpen] = useState(false);
  const menuBtnRef = useRef(null);

  return (
    <div className="fixed top-0 w-full z-10">
      <div
        style={{
          background: "linear-gradient(43deg, #4158D0, #C850C0, #FFCC70)",
          width: "100%",
          height: "4px",
        }}
      ></div>
      <div className="py-3 px-8 backdrop-blur-sm bg-layer-400/70 drop-shadow">
        <div className="max-w-[90rem] m-auto">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-8">
              <div className="flex flex-row items-center gap-8 min-[1440px]:w-80 max-[1440px]:w-[18rem] max-sm:w-fit border-r border-layer-200 max-[1000px]:border-transparent">
                <Link
                  className={`text-[14px] cursor-pointer ${IBM.className}`}
                  href="/projects"
                >
                  {"> W298.dev"}
                </Link>
              </div>
              <div className="flex flex-row items-center gap-3 max-[1000px]:hidden">
                {pageData.map(({ title, dir }) => {
                  return (
                    <Link
                      key={`Link-${title}`}
                      className={`text-sm ${
                        pathname.includes(dir)
                          ? "bg-layer-200 font-bold"
                          : "bg-layer-300"
                      } w-[5.5rem] h-[1.7rem] flex justify-center items-center rounded-sm border border-transparent hover:border-layer-100 cursor-pointer transition`}
                      href={dir}
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
                className="h-[2rem] px-3 rounded-sm flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition"
              >
                <MarkGithubIcon fill="#c6c6c6" size={17} />
                <span className="font-bold text-sm text-text-secondary max-sm:hidden">
                  Github
                </span>
              </a>
              <a
                title="Youtube Channel"
                href="https://www.youtube.com/@W298-dev"
                target="_blank"
                className="h-[2rem] px-3 rounded-sm flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition"
              >
                <Youtube fill="#c6c6c6" size={17} />
                <span className="font-bold text-sm text-text-secondary max-sm:hidden">
                  Youtube
                </span>
              </a>
              <div className="relative">
                <div
                  title="Menu"
                  onClick={() => {
                    setDropdownNavOpen(!dropdownNavOpen);
                  }}
                  ref={menuBtnRef}
                  className={`h-[2rem] px-3 rounded-sm flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition cursor-pointer ${
                    dropdownNavOpen ? "bg-layer-300" : ""
                  }`}
                >
                  <AppsIcon fill="#c6c6c6" size={17} />
                  <span className="font-bold text-sm text-text-secondary max-sm:hidden">
                    Menu
                  </span>
                </div>
                <DropdownNav
                  open={dropdownNavOpen}
                  setOpen={setDropdownNavOpen}
                  menuBtnRef={menuBtnRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
