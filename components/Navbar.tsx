"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import pageData from "../data/pageData.json";
import { MarkGithubIcon, AppsIcon } from "@primer/octicons-react";
import { useRef, useState } from "react";
import DropdownNav from "./DropdownNav";
import { Youtube } from "@icons-pack/react-simple-icons";

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
          height: "2px",
        }}
      ></div>
      <div className="backdrop-blur-sm bg-layer-400/70 drop-shadow h-[48px]">
        <div className="max-w-[90rem] h-full m-auto">
          <div className="flex flex-row justify-between items-center h-full">
            <div className="flex flex-row items-center gap-8 h-full">
              <div className="flex flex-row items-center gap-8 h-full min-[900px]:w-[20.5rem]">
                <Link
                  className={`text-[1.25rem] cursor-pointer font-bold tracking-wide scale-y-90 pl-7 flex flex-row gap-5 items-center`}
                  href="/projects"
                >
                  <img src="/imgs/avatar.png" className="w-[26px] h-[26px]" />
                  {"W298.dev"}
                </Link>
              </div>
              <div className="h-[60%] w-[1px] border-r border-layer-200 max-[1000px]:border-transparent"></div>
              <div className="flex flex-row items-center max-[900px]:hidden h-full">
                {pageData.map(({ title, dir }) => {
                  return (
                    <Link
                      key={`Link-${title}`}
                      className={`text-[15px] border-b-[3px] font-semibold ${
                        pathname.includes(dir)
                          ? "border-b-white"
                          : "border-b-[transparent] transparent"
                      } w-[6.25rem] h-full flex justify-center items-center cursor-pointer transition hover:bg-layer-300`}
                      href={dir}
                    >
                      {title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row items-center h-full pr-[3.5rem]">
              <a
                title="Github Profile"
                href="https://github.com/W298"
                target="_blank"
                className="h-full w-[48px] flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition"
              >
                <MarkGithubIcon fill="#c6c6c6" size={17} />
              </a>
              <a
                title="Youtube Channel"
                href="https://www.youtube.com/@W298-dev"
                target="_blank"
                className="h-full w-[48px] flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition"
              >
                <Youtube fill="#c6c6c6" size={17} />
              </a>
              <div className="relative h-full">
                <div
                  title="Menu"
                  onClick={() => {
                    setDropdownNavOpen(!dropdownNavOpen);
                  }}
                  ref={menuBtnRef}
                  className={`h-full w-[48px] flex flex-row gap-2 justify-center items-center hover:bg-layer-300 transition cursor-pointer ${
                    dropdownNavOpen ? "bg-layer-300" : ""
                  }`}
                >
                  <AppsIcon fill="#c6c6c6" size={17} />
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
