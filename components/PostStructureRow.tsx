import { ChevronDownIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PostStructureLink from "./PostStructureLink";
import path from "path";

interface PostData {
  title: string;
  date: string;
  postId: string;
}

interface PostStructureRowProp {
  tag: string;
  list: PostData[];
}

export default function PostStructureRow({ tag, list }: PostStructureRowProp) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    var exist =
      list.filter(({ postId }) => {
        var { dir, name } = path.parse(pathname);
        return dir == "/posts" && postId == name;
      }).length != 0;

    if (!expanded && tag != "All" && exist) setExpanded(true);
  }, [pathname]);

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
      {list
        .sort(({ date: aDateStr }, { date: bDateStr }) => {
          let a = new Date(aDateStr);
          let b = new Date(bDateStr);
          return a > b ? -1 : a == b ? 0 : 1;
        })
        .map(({ title, postId }) => {
          return (
            <PostStructureLink
              key={`post-sidebar-${title}`}
              title={title}
              postId={postId}
              expanded={expanded}
              active={
                path.parse(pathname).dir == "/posts" &&
                path.parse(pathname).name == postId
              }
            />
          );
        })}
    </div>
  );
}
