"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  let currentIndex = 0;

  return (
    <div className="fixed w-80 h-full bg-layer-350 drop-shadow">
      <div className="text-xl font-semibold pb-4 pt-8 px-8">
        {pageList.find(({ path }) => path == pathname).title}
      </div>
      <div>
        {["Game developement", "Web developement", "etc"].map(
          (title, index) => {
            return (
              <div
                className={`py-1 px-8 text-text-secondary font-bold cursor-pointer ${
                  index == currentIndex
                    ? "border-l-custom-active bg-layer-300"
                    : "border-l-custom hover:bg-layer-300"
                }`}
              >
                {title}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
