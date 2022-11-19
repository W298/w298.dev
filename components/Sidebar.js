"use client";

import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@primer/octicons-react";
import { useEffect, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

class NodeBase {
  constructor(title, children = []) {
    this.title = title;
    this.parent = null;
    this.children = children;

    children.forEach((child) => {
      child.parent = this;
    });
  }
}

class ProjectCategory extends NodeBase {
  createDiv() {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <div
          className="flex flex-row items-center justify-between py-[0.4rem] px-8 cursor-pointer hover:bg-layer-300 transition"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <div className="text-text-secondary font-bold">{this.title}</div>
          <ChevronDownIcon
            fill="#f4f4f4"
            size={16}
            className={`transition ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        {this.children.map((project) => {
          return (
            <ScrollLink
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
}

class Project extends NodeBase {}

export default function Sidebar() {
  const pathname = usePathname();
  const pageList = [
    { title: "Projects", path: "/" },
    { title: "Posts", path: "/posts" },
    { title: "About Me", path: "/aboutMe" },
  ];

  const hierarchy = new NodeBase("root", [
    new ProjectCategory("Game development", [
      new Project("Intersection"),
      new Project("Together"),
      new Project("Pixel Reversi"),
    ]),
    new ProjectCategory("Web developement", [new Project("Today's Genshin")]),
    new ProjectCategory("etc", []),
  ]);

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
    <div className="fixed w-80 h-full bg-layer-350 drop-shadow max-[700px]:hidden">
      <div className="text-xl font-semibold pb-4 pt-8 px-8">
        {pageList.find(({ path }) => path == pathname).title}
      </div>
      <div ref={refProjectContainer}>
        {hierarchy.children.map((projectCategory) => {
          return projectCategory.createDiv();
        })}
      </div>
    </div>
  );
}
