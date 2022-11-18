"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  const DotEx = () => {
    return (
      <div className="relative">
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="octicon octicon-dot-fill fill-muted"
        >
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z"></path>
        </svg>
        <div className="absolute w-[1px] h-screen top-[8px] left-[7.5px] bg-muted"></div>
      </div>
    );
  };

  const SubMenu = ({ title }) => {
    return (
      <div className="pl-4 select-none cursor-pointer relative">
        <div className="absolute w-5 h-[1px] top-[50%] -left-[20px] bg-muted"></div>
        <div className="font-light">{title}</div>
      </div>
    );
  };

  const currentCategory = "Game Dev.";

  return (
    <div className="fixed w-80 h-full bg-secondary drop-shadow p-8">
      <div className="text-xl font-semibold mb-2">
        {pageList.find(({ path }) => path == pathname).title}
      </div>
      <div>
        {["Game Dev.", "Web Dev.", "ETC"].map((title) => {
          return (
            <div className="flex flex-row items-top py-2">
              <DotEx />
              <div className="pl-3 text-l text-muted select-none cursor-pointer">
                <div className="-mt-1">{title}</div>
                <SubMenu title={"Intersection"} />
                <SubMenu title={"Together"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
