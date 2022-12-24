import { ProjectCardData } from "./interface/ProjectDataInterface";
import {
  GitCommitIcon,
  RepoIcon,
  LinkIcon,
  ImageIcon,
} from "@primer/octicons-react";
import { Notion, Youtube, Velog } from "@icons-pack/react-simple-icons/dist";
import { Tag, CustomTag } from "./Tag";
import Link from "next/link";

interface ProjectCardProp {
  data: ProjectCardData;
}

export default function ProjectCard({ data }: ProjectCardProp) {
  const LinkTags = () => {
    return (
      <>
        {data.repo && (
          <Link
            href={data.repo}
            target="_blank"
            className="rounded-full border border-transparent hover:border-layer-100 transition"
          >
            <CustomTag Icon={RepoIcon} title="Github" color="#393939" />
          </Link>
        )}
        {data.notion && (
          <Link
            href={data.notion}
            target="_blank"
            className="rounded-full border border-transparent hover:border-layer-100 transition"
          >
            <CustomTag Icon={Notion} title="Notion" color="#393939" />
          </Link>
        )}
        {data.link && (
          <Link
            href={data.link}
            target="_blank"
            className="rounded-full border border-transparent hover:border-layer-100 transition"
          >
            <CustomTag Icon={LinkIcon} title="Link" color="#393939" />
          </Link>
        )}
        {data.youtube && (
          <Link
            href={data.youtube}
            target="_blank"
            className="rounded-full border border-transparent hover:border-layer-100 transition"
          >
            <CustomTag Icon={Youtube} title="Youtube" color="#393939" />
          </Link>
        )}
        {data.velog && (
          <Link
            href={data.velog}
            target="_blank"
            className="rounded-full border border-transparent hover:border-layer-100 transition"
          >
            <CustomTag Icon={Velog} title="Velog" color="#393939" />
          </Link>
        )}
      </>
    );
  };

  return (
    <div
      className="@container min-w-min rounded-md bg-layer-350 border border-layer-200"
      id={data.title}
    >
      <div className="h-32 overflow-hidden relative">
        <img
          src={data.imgSrc}
          className="object-cover min-h-full rounded-t-md"
          alt={data.title}
        />
        <Link
          className="absolute bottom-2 right-2 rounded-full border border-transparent hover:border-layer-100 transition"
          href={"/projects/" + data.title}
        >
          <CustomTag Icon={ImageIcon} title="Screenshots" color="#393939CC" />
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
          <div className="flex flex-row gap-2 items-center">
            <GitCommitIcon size={16} />
            <div className="font-light text-xs text-text-secondary -mt-[3px]">
              {`Last Commit - ${data.lastCommit} `}
            </div>
          </div>
          <div className="flex flex-row flex-wrap-reverse justify-end gap-2">
            <LinkTags />
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
        <div className="flex flex-row gap-2 items-center">
          <GitCommitIcon size={16} />
          <div className="font-light text-xs text-text-secondary -mt-[3px]">
            {`Last Commit - ${data.lastCommit} `}
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <LinkTags />
        </div>
      </div>
    </div>
  );
}
