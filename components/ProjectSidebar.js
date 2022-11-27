"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ProjectCategory from "./ProjectCategory";

export default function ProjectSidebar({ projectData }) {
  const pathname = usePathname();

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

  if (pathname != "/") return null;
  return (
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
  );
}
