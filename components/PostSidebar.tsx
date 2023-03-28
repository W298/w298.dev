"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";
import PostStructureRow from "./PostStructureRow";

export default function PostSidebar({ structure }) {
  const pathname = usePathname();
  const [expandedTag, setExpandedTag] = useState("");

  useEffect(() => {
    const { dir, name } = path.parse(pathname);

    if (dir == "/" && name == "posts") {
      setExpandedTag("");
      return;
    }

    const needExpandTag = Object.keys(structure).filter((tag) => {
      return (
        structure[tag].filter(({ postId, tags }) => {
          const isFirst = tags.split(",").indexOf(tag) == 0;
          return dir == "/posts" && postId == name && isFirst;
        }).length != 0
      );
    })[0];

    const compatiableExpanded =
      expandedTag != "" &&
      structure[expandedTag].filter(({ postId }) => {
        return dir == "/posts" && postId == name;
      });

    if (!compatiableExpanded) setExpandedTag(needExpandTag);
  }, [pathname]);

  return (
    <div>
      {Object.keys(structure).map((tag) => (
        <PostStructureRow
          key={`post-sidebar-tag-${tag}`}
          tag={tag}
          list={structure[tag]}
          expandedTag={expandedTag}
          setExpandedTag={setExpandedTag}
        />
      ))}
    </div>
  );
}
