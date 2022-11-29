"use client";

import { useEffect, useRef } from "react";
import ProjectCategory from "./ProjectCategory";
import { CategoryData } from "./interface/ProjectDataInterface";

interface ProjectSidebarProp {
  projectData: CategoryData[];
}

export default function ProjectSidebar({ projectData }: ProjectSidebarProp) {
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
    <div ref={refProjectContainer}>
      {projectData.map((categoryData, index) => {
        return (
          <ProjectCategory
            key={`Category-${categoryData.categoryTitle}`}
            categoryData={categoryData}
            isAlreadyExpanded={index == 0}
          />
        );
      })}
    </div>
  );
}
