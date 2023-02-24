"use client";

import { ChevronDownIcon } from "@primer/octicons-react";
import { useState } from "react";
import { CategoryData } from "./interface/ProjectDataInterface";
import { ReactScroll } from "react-scroll-ts";

interface ProjectCategoryProp {
  categoryData: CategoryData;
  isAlreadyExpanded: boolean;
}

export default function ProjectCategory({
  categoryData: { categoryTitle, projectCardList },
  isAlreadyExpanded = false,
}: ProjectCategoryProp) {
  const [expanded, setExpanded] = useState(isAlreadyExpanded);

  const releaseList = projectCardList.filter(({ released }) => released);
  const firstRow = 0;
  const releaseLastRow = Math.ceil(releaseList.length / 2) - 1;
  const devFirstRow = releaseLastRow + 1;
  const lastRow = Math.ceil(projectCardList.length / 2) - 1;

  return (
    <div>
      <div
        className="flex flex-row items-center justify-between py-[0.4rem] px-6 cursor-pointer hover:bg-layer-300 transition"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="text-text-secondary font-bold">{categoryTitle}</div>
        <ChevronDownIcon
          fill="#f4f4f4"
          size={16}
          className={`transition ${expanded ? "rotate-180" : ""}`}
        />
      </div>
      {projectCardList.map((project, index) => {
        const currentRow = Math.floor(index / 2);

        const topOffset =
          currentRow == firstRow ? -120 : currentRow == devFirstRow ? -60 : -10;
        const bottomOffset =
          currentRow == lastRow ? 90 : currentRow == releaseLastRow ? 40 : 10;
        return (
          <ReactScroll
            key={`scroll-receiver-${index}`}
            targetID={`projectCard-${project.title
              .replaceAll(" ", "")
              .replaceAll("!", "")
              .replaceAll(":", "")
              .replaceAll("'", "")}`}
            baseLineOption={{ offset: 300 }}
            elementOption={{ topOffset, bottomOffset }}
            activeClassName="border-l-custom-active bg-layer-300"
            className={`block py-[0.4rem] px-10 cursor-pointer text-text-secondary border-l-custom hover:bg-layer-300 transition ${
              expanded ? "block" : "hidden"
            }`}
          >
            {project.title}
          </ReactScroll>
        );
      })}
    </div>
  );
}
