import { ChevronDownIcon } from "@primer/octicons-react";
import { usePathname } from "next/navigation";
import PostStructureLink from "./PostStructureLink";
import path, { posix } from "path";
import PostStructureSeries from "./PostStructureSeries";

interface PostData {
  title: string;
  date: string;
  tags: string;
  series: string | null;
  postId: string;
}

interface PostStructureRowProp {
  tag: string;
  list: PostData[];
  expandedTag: string;
  setExpandedTag: any;
}

export default function PostStructureRow({
  tag,
  list,
  expandedTag,
  setExpandedTag,
}: PostStructureRowProp) {
  const pathname = usePathname();

  const seriesWrap = { "no-series": [] };
  list.forEach((data) => {
    if (data.series == null) {
      seriesWrap["no-series"].push(data);
    } else {
      if (data.series in seriesWrap) {
        seriesWrap[data.series].push(data);
      } else {
        seriesWrap[data.series] = [];
        seriesWrap[data.series].push(data);
      }
    }
  });

  return (
    <div>
      <div
        className="flex flex-row items-center justify-between py-[0.4rem] px-6 pl-10 cursor-pointer hover:bg-layer-300 transition"
        onClick={() => {
          setExpandedTag(expandedTag == tag ? "" : tag);
        }}
      >
        <div className="text-text-secondary font-bold">{tag}</div>
        <ChevronDownIcon
          fill="#f4f4f4"
          size={16}
          className={`transition ${expandedTag == tag ? "rotate-180" : ""}`}
        />
      </div>
      {Object.entries(seriesWrap)
        .filter(([series]) => series != "no-series")
        .map(([series, data]) => {
          return (
            <PostStructureSeries
              key={`post-sidebar-series-${series}`}
              seriesName={series}
              expanded={expandedTag == tag}
              active={
                (path.parse(pathname).dir == "/posts/series" &&
                  path.parse(pathname).name == series.toLowerCase()) ||
                (path.parse(pathname).dir == "/posts" &&
                  data.map((d) => d.postId).includes(path.parse(pathname).name))
              }
            />
          );
        })}
      {seriesWrap["no-series"]
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
              expanded={expandedTag == tag}
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
