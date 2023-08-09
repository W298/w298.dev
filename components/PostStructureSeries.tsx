import { FileDirectoryIcon } from "@primer/octicons-react";
import Link from "next/link";

interface PostStructureSeriesProp {
  seriesName: string;
  expanded: boolean;
  active: boolean;
}

export default function PostStructureSeries({
  seriesName,
  expanded,
  active,
}: PostStructureSeriesProp) {
  return (
    <Link
      className={`gap-3 py-[0.4rem] px-10 pl-14 cursor-pointer border-l-custom hover:bg-layer-300 transition ${
        expanded ? "flex" : "hidden"
      } ${active ? "border-l-custom-active bg-layer-300" : ""}`}
      href={`/posts/series/${seriesName.toLowerCase()}`}
    >
      <FileDirectoryIcon fill="#c6c6c6" className="mt-[4px]" />
      <div className="truncate text-text-secondary">{seriesName}</div>
    </Link>
  );
}
