"use client";

import { ProjectCardData } from "./interface/ProjectDataInterface";
import { GitCommitIcon, LinkIcon, ImageIcon } from "@primer/octicons-react";
import {
  Notion,
  Youtube,
  Itchdotio,
  Github,
  Npm,
  Steam,
} from "@icons-pack/react-simple-icons/dist";
import { Tag, CustomTag } from "./Tag";
import Link from "next/link";
import { useState, useEffect } from "react";
import { debounce } from "debounce";

interface ProjectCardProp {
  data: ProjectCardData;
  lastCommit: Date;
}

interface LinkTagsProp {
  data: ProjectCardData;
}

function LinkTags({ data }: LinkTagsProp) {
  return (
    <>
      {data.link.steam && (
        <Link
          href={data.link.steam}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Steam} title="Steam" color="#393939" />
        </Link>
      )}
      {data.link.repo && (
        <Link
          href={data.link.repo}
          target="_blank"
          className="rounded-full border border-transparent hover:border-layer-100 transition"
        >
          <CustomTag Icon={Github} title="Github" color="#393939" />
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

export default function ProjectCard({ data, lastCommit }: ProjectCardProp) {
  const [isMouseHover, setMouseHover] = useState(false);
  const [isMouseRealHover, setMouseRealHover] = useState(false);
  const enterEvent = debounce(() => {
    setMouseHover(true);
    leaveEvent.flush();
  }, 300);
  const leaveEvent = debounce(() => {
    setMouseHover(false);
    enterEvent.flush();
  }, 300);

  useEffect(() => {
    const image = new Image();
    image.src = data.previewSrc;
  }, []);

  return (
    <div
      className="@container min-w-min rounded-md bg-layer-350 border border-layer-200 hover:border-layer-100 hover:scale-[103%] transition"
      id={`projectCard-${data.title
        .replaceAll(" ", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .replaceAll("'", "")}`}
      onMouseEnter={() => {
        setMouseRealHover(true);
        enterEvent();
      }}
      onMouseLeave={() => {
        setMouseRealHover(false);
        leaveEvent();
      }}
    >
      <div className="h-32 overflow-hidden relative">
        <img
          src={isMouseHover && data.previewSrc ? data.previewSrc : data.imgSrc}
          className={`object-cover min-h-full rounded-t-md transition duration-150 ${
            isMouseRealHover != isMouseHover && data.previewSrc
              ? "blur-[2px]"
              : ""
          }`}
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
      <div className="@[450px]:flex h-[11rem] p-6 flex-col hidden">
        <div className="flex-1 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-extrabold text-2xl">{data.title}</div>
            <div>
              {data.description.map((d) => {
                return <div className="font-light text-sm">{d}</div>;
              })}
            </div>
          </div>
          <div className="max-w-[35%] flex flex-row flex-wrap justify-end content-start mt-1 gap-2">
            {data.tags.map((title) => {
              return <Tag title={title} />;
            })}
          </div>
        </div>
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row gap-2 items-center -mb-[1px]">
            <GitCommitIcon size={16} />
            <div className="font-light text-xs text-text-secondary -mt-[5px]">
              {`Last Commit - ${
                lastCommit == null
                  ? "No_Info"
                  : lastCommit.toString().substring(0, 10)
              } `}
            </div>
          </div>
          <div className="flex flex-row flex-wrap-reverse justify-end gap-2">
            <LinkTags data={data} />
          </div>
        </div>
      </div>
      <div className="@[450px]:hidden p-5 flex flex-col gap-3">
        <div className="flex flex-row flex-wrap gap-2">
          {data.tags.map((title) => {
            return <Tag title={title} />;
          })}
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-extrabold text-2xl">{data.title}</div>
          <div>
            {data.description.map((d) => {
              return <div className="font-light text-sm">{d}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center -mb-[1px]">
          <GitCommitIcon size={16} />
          <div className="font-light text-xs text-text-secondary -mt-[3px]">
            {`Last Commit - ${
              lastCommit == null
                ? "No_Info"
                : lastCommit.toString().substring(0, 10)
            } `}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <LinkTags data={data} />
        </div>
      </div>
    </div>
  );
}
