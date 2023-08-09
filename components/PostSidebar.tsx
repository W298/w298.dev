"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";
import PostStructureRow from "./PostStructureRow";
import { FileDirectoryIcon } from "@primer/octicons-react";
import Link from "next/link";

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

  const seriesList = [];
  Object.values(structure)
    .flat()
    .forEach((data) => {
      if (data["series"] != null && !seriesList.includes(data["series"])) {
        seriesList.push(data["series"]);
      }
    });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-lg font-semibold py-[0.4rem] px-6">Tags</div>
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
      <div>
        <div className="text-lg font-semibold py-[0.4rem] px-6">Series</div>
        {seriesList.map((seriesName) => {
          return (
            <Link
              key={`post-sidebar-series-link-${seriesName}`}
              href={`/posts/series/${seriesName.toLowerCase()}`}
              className="flex flex-row items-center py-[0.4rem] px-6 pl-10 cursor-pointer hover:bg-layer-300 transition gap-3"
            >
              <FileDirectoryIcon fill="#c6c6c6" />
              <div className="text-text-secondary font-bold">{seriesName}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
