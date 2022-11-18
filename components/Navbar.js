"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Github } from "@icons-pack/react-simple-icons";

export default function Navbar() {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  return (
    <div className="sticky top-0 py-3 px-8 backdrop-blur-sm bg-primary/70 drop-shadow">
      <div className="max-w-[90rem] m-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row gap-8 w-80">
              <img
                src="https://avatars.githubusercontent.com/u/25034289?v=4"
                className="w-8 h-8"
              ></img>
              <Link
                className="font-bold text-[1.2rem] text-white cursor-pointer"
                href="/"
              >
                W298.me
              </Link>
            </div>
            <div className="flex flex-row items-center gap-3">
              {pageList.map(({ title, path }) => {
                return (
                  <Link
                    className={`text-sm text-white ${
                      path == pathname
                        ? "bg-highlight font-bold"
                        : "bg-secondary"
                    } px-4 py-0.5 border border-transparent rounded hover:border-highlight cursor-pointer transition`}
                    href={path}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <a href="https://github.com/W298" target="_blank">
              <Github color="#cdd9e5" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
