"use client";

import { ChevronDownIcon } from "@primer/octicons-react";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";

export default function ProjectCategory({
  title,
  projectCardList,
  isAlreadyExpanded,
}) {
  const [expanded, setExpanded] = useState(isAlreadyExpanded);

  return (
    <div>
      <div
        className="flex flex-row items-center justify-between py-[0.4rem] px-8 cursor-pointer hover:bg-layer-300 transition"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="text-text-secondary font-bold">{title}</div>
        <ChevronDownIcon
          fill="#f4f4f4"
          size={16}
          className={`transition ${expanded ? "rotate-180" : ""}`}
        />
      </div>
      {projectCardList.map((project) => {
        return (
          <ScrollLink
            key={`ProjectCard-${project}`}
            activeClass="border-l-custom-active bg-layer-300"
            className={`block py-[0.4rem] px-12 cursor-pointer text-text-secondary border-l-custom hover:bg-layer-300 transition ${
              expanded ? "block" : "hidden"
            }`}
            spy={true}
            smooth={true}
            offset={-150}
            duration={400}
            to={project.title}
          >
            {project.title}
          </ScrollLink>
        );
      })}
    </div>
  );
}
