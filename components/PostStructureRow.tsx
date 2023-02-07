import { ChevronDownIcon } from "@primer/octicons-react";
import { useState } from "react";
import PostStructureLink from "./PostStructureLink";

export default function PostStructureRow({ tag, list }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        className="flex flex-row items-center justify-between py-[0.4rem] px-6 cursor-pointer hover:bg-layer-300 transition"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="text-text-secondary font-bold">{tag}</div>
        <ChevronDownIcon
          fill="#f4f4f4"
          size={16}
          className={`transition ${expanded ? "rotate-180" : ""}`}
        />
      </div>
      {list.map(({ title, postId }) => {
        return (
          <PostStructureLink
            key={`post-sidebar-${title}`}
            title={title}
            postId={postId}
            expanded={expanded}
          />
        );
      })}
    </div>
  );
}
