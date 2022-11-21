import { GitCommitIcon } from "@primer/octicons-react";
import Tag from "./Tag";

export default function ProjectCard({ data }) {
  return (
    <div
      className="min-w-min rounded-md bg-layer-350 border border-layer-200"
      id={data.title}
    >
      <img
        src={"/imgs/projectCardImage/intersection.png"}
        className="object-cover h-28 rounded-t-md"
        alt={data.title}
      />
      <div className="h-[11rem] p-6 flex flex-col max-sm:hidden">
        <div className="flex-1 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-extrabold text-2xl">{data.title}</div>
            <div>
              {data.description.map((d) => {
                return <div className="font-light text-sm">{d}</div>;
              })}
            </div>
          </div>
          <div className="max-w-[40%] flex flex-row flex-wrap justify-end content-start mt-1 gap-2">
            {data.tags.map((tagData) => {
              return <Tag title={tagData.title} color={tagData.color} />;
            })}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <GitCommitIcon size={16} />
            <div className="font-light text-xs text-text-secondary -mt-[3px]">
              {`Last Commit - ${data.lastCommit} `}
            </div>
          </div>
          <div className="flex flex-row flex-wrap-reverse justify-end gap-2">
            {data.repo.active && (
              <a href={data.repo.href} target="_blank">
                <Tag title="Github" color="#393939" />
              </a>
            )}
            {data.notion.active && (
              <a href={data.notion.href} target="_blank">
                <Tag title="Notion" color="#393939" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 sm:hidden">
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
        <div className="flex flex-row justify-between">
          <div className="flex flex-row flex-wrap gap-2">
            {data.tags.map((tagData) => {
              return <Tag title={tagData.title} color={tagData.color} thin />;
            })}
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {data.repo.active && (
              <a href={data.repo.href} target="_blank">
                <Tag title="Github" color="#393939" thin />
              </a>
            )}
            {data.notion.active && (
              <a href={data.notion.href} target="_blank">
                <Tag title="Notion" color="#393939" thin />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
