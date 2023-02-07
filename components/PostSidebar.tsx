"use client";

import PostStructureRow from "./PostStructureRow";

export default function PostSidebar({ structure }) {
  return (
    <div>
      {Object.keys(structure).map((tag) => (
        <PostStructureRow
          key={`post-sidebar-tag-${tag}`}
          tag={tag}
          list={structure[tag]}
        />
      ))}
    </div>
  );
}
