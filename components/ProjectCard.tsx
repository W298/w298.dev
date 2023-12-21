"use client";

import { ProjectCardData } from "./interface/ProjectDataInterface";
import { LinkIcon, ImageIcon } from "@primer/octicons-react";
import {
  Notion,
  Youtube,
  Itchdotio,
  Github,
  Npm,
  Steam,
  Gitlab,
} from "@icons-pack/react-simple-icons/dist";
import { Tag, CustomTag } from "./Tag";
import Link from "next/link";
import { useState, useRef, ReactNode } from "react";
import { debounce } from "debounce";
import ImageLoading from "./ImageLoading";

interface ProjectCardProp {
  data: ProjectCardData;
  lastCommitNode: ReactNode;
  hoverTooltip: Boolean;
}

interface LinkTagsProp {
  data: ProjectCardData;
}

function LinkTags({ data }: LinkTagsProp) {
  return (
    <>
      {data.link.repo && (
        <Link
          href={data.link.repo}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Github} title="Github" color="#393939" />
        </Link>
      )}
      {data.link.lab && (
        <Link
          href={data.link.lab}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Gitlab} title="Gitlab" color="#393939" />
        </Link>
      )}
      {data.link.steam && (
        <Link
          href={data.link.steam}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Steam} title="Steam" color="#393939" />
        </Link>
      )}
      {data.link.notion && (
        <Link
          href={data.link.notion}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Notion} title="Notion" color="#393939" />
        </Link>
      )}
      {data.link.link && (
        <Link
          href={data.link.link}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={LinkIcon} title="Link" color="#393939" />
        </Link>
      )}
      {data.link.youtube && (
        <Link
          href={data.link.youtube}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Youtube} title="Youtube" color="#393939" />
        </Link>
      )}
      {data.link.itchio && (
        <Link
          href={data.link.itchio}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Itchdotio} title="itch.io" color="#393939" />
        </Link>
      )}
      {data.link.npm && (
        <Link
          href={data.link.npm}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Npm} title="npm" color="#393939" />
        </Link>
      )}
    </>
  );
}

export default function ProjectCard({
  data,
  lastCommitNode,
  hoverTooltip,
}: ProjectCardProp) {
  const [isMouseHover, setMouseHover] = useState(false);
  const [isMouseRealHover, setMouseRealHover] = useState(false);
  const enterEvent = debounce(() => {
    setMouseHover(true);
    if (previewVideo.current) previewVideo.current.currentTime = 0;
    leaveEvent.flush();
  }, 500);
  const leaveEvent = debounce(() => {
    setMouseHover(false);
    enterEvent.flush();
  }, 500);

  const previewVideo = useRef(null);

  return (
    <div
      className="bg-layer-350 border border-transparent hover:border-layer-100 hover:scale-[102%] transition flex flex-col justify-between"
      id={`projectCard-${data.title
        .replaceAll(" ", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .replaceAll("'", "")}`}
      onMouseEnter={() => {
        if (data.previewSrc == null) return;
        setMouseRealHover(true);
        enterEvent();
      }}
      onMouseLeave={() => {
        setMouseRealHover(false);
        leaveEvent();
      }}
    >
      <div className="flex flex-col">
        <div className="h-[7rem] overflow-hidden relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={data.imgSrc}
            className={`${
              isMouseHover ? "" : "hidden"
            } object-cover min-h-full transition duration-150 ${
              isMouseRealHover != isMouseHover && data.previewSrc
                ? "blur-[2px]"
                : ""
            }`}
            ref={previewVideo}
          >
            <source src={data.previewSrc} type="video/mp4" />
          </video>
          <ImageLoading
            src={data.imgSrc}
            loading="lazy"
            quality={100}
            width={510}
            height={227}
            unoptimized={true}
            className={`${
              isMouseHover ? "hidden" : ""
            } object-cover min-h-full transition duration-150 ${
              isMouseRealHover != isMouseHover && data.previewSrc
                ? "blur-[2px]"
                : ""
            }`}
            top="4rem"
            isFull
            alt={data.title}
          />
          <Link
            className="absolute bottom-2 right-2 rounded-full border border-transparent hover:border-layer-100 transition"
            href={"/projects/" + data.title}
          >
            {data.screenshots.length != 0 && (
              <CustomTag Icon={ImageIcon} title="Screenshots" color="#393939CC" />
            )}
          </Link>
        </div>
        <div className="flex py-3 px-4 pt-3">
          <div className="flex-1 flex flex-row justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="font-extrabold text-[20px]">{data.title}</div>
              <div>
                {data.description.map((d, idx) => {
                  return (
                    <div
                      key={`${data.title}-description-${idx}`}
                      className="font-light text-[13px]"
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="max-w-[35%] flex flex-row flex-wrap justify-end content-start mt-1 gap-2">
              {data.tags.map((title, idx) => {
                return <Tag key={`${data.title}-tag-${idx}`} title={title} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center py-2 px-4 border-t-[1px] border-[#393939]">
        <div className="flex flex-row gap-2">
          <LinkTags data={data} />
        </div>
        {lastCommitNode}
      </div>
    </div>
  );
}
