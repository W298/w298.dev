"use client";

import { ProjectCardData } from "./interface/ProjectDataInterface";
import { ReplyIcon, ImageIcon } from "@primer/octicons-react";
import Link from "next/link";

interface ScreenshotExplorerProp {
  data: ProjectCardData | undefined;
}

export default function ScreenshotExplorer({ data }: ScreenshotExplorerProp) {
  return (
    <div>
      <Link
        className="mb-6 text-sm bg-layer-300 w-[5.5rem] h-[1.7rem] flex gap-2 justify-center items-center rounded-sm border border-transparent hover:border-layer-100 transition"
        href="/projects"
      >
        <ReplyIcon size={16} />
        <div className="text-sm">Return</div>
      </Link>
      <div className="bg-layer-200 w-full h-[1px]"></div>
      <div className="mt-6 mb-8 flex flex-col gap-1">
        <div className="text-xl font-bold">{data?.title}</div>
        <div className="flex gap-2 items-center">
          <ImageIcon size={16} />
          <div className="text-sm">Screenshots</div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {data?.screenshots.map((src, index) => {
          return (
            <img
              key={`img-${data.title}-${index}`}
              className="w-[800px] rounded"
              src={src}
            />
          );
        })}
        {data && data.screenshots.length == 0 && (
          <div className="text-sm">No Screenshots. ¯\(°_o)/¯</div>
        )}
      </div>
    </div>
  );
}
