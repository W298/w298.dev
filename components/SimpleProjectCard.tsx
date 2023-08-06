"use client";

import Image from "next/image";
import { ReactScroll } from "react-scroll-ts";
import { ProjectCardData } from "./interface/ProjectDataInterface";
import { Tag } from "./Tag";

interface SimpleProjectCardProp {
  data: ProjectCardData;
  blurImg: string;
}

export default function SimpleProjectCard({
  data,
  blurImg,
}: SimpleProjectCardProp) {
  const targetName = `projectCard-${data.title
    .replaceAll(" ", "")
    .replaceAll("!", "")
    .replaceAll(":", "")
    .replaceAll("'", "")}`;

  return (
    <ReactScroll
      key={`${targetName}-pinned`}
      targetID={targetName}
      baseLineOption={{ offset: 200 }}
      className="min-w-min rounded-md bg-layer-350 border border-layer-200 hover:border-layer-100 flex flex-col cursor-pointer transition"
    >
      <div className="flex-1 flex flex-row px-4 py-[0.3rem] justify-between align-middle">
        <div className="font-bold text-md">{data.title}</div>
        <div className="flex flex-row flex-wrap gap-2">
          {data.tags.map((tag, idx) => {
            if (idx > 1) return;
            return <Tag key={`${targetName}-pinned-${idx}`} title={tag} />;
          })}
        </div>
      </div>
      <Image
        src={data.imgSrc}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurImg}
        priority={false}
        width={326}
        height={32}
        className="object-cover h-8 rounded-b-md top-5 object-[center_8%]"
        alt={data.title}
      />
    </ReactScroll>
  );
}
