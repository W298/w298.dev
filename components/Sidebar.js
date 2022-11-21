"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import ProjectCategory from "./ProjectCategory";

export default function Sidebar({ projectData }) {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  const refProjectContainer = useRef(null);
  const scrollHandler = () => {
    [...refProjectContainer.current.children].forEach((category) => {
      let active = [...category.children].some(
        (project) =>
          project.className.includes("border-l-custom-active") &&
          project.className.includes("hidden")
      );
      if (active) category.children[0].click();
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="fixed w-80 h-full bg-layer-350 drop-shadow max-[700px]:hidden -z-10">
      <div className="text-xl font-semibold pb-4 pt-8 px-8">
        {pageList.find(({ path }) => path == pathname).title}
      </div>
      <div ref={refProjectContainer}>
        {projectData.map(({ category, projectCardList }, index) => {
          return (
            <ProjectCategory
              key={`Category-${category}`}
              title={category}
              projectCardList={projectCardList}
              isAlreadyExpanded={index == 0}
            />
          );
        })}
      </div>
    </div>
  );
}
