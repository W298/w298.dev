import { Unity, Blender, Notion } from "@icons-pack/react-simple-icons";
import { RepoIcon, GitCommitIcon } from "@primer/octicons-react";
import Tag from "./ProjectTag";

export default function ProjectCard({ title }) {
  return (
    <div
      className="min-w-min rounded-md bg-layer-350 border border-layer-200"
      id={title}
    >
      <img
        src="https://w298.me/static/media/bgImg.57b3dfc9.png"
        className="object-cover h-28 rounded-t-md"
      ></img>
      <div className="h-[10.5rem] p-6 flex flex-col">
        <div className="flex-1 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-extrabold text-2xl">{title}</div>
            <div>
              <div className="font-light text-sm">
                Traffic Management Game with Roads
              </div>
              <div className="font-light text-sm">Develop With Unity</div>
            </div>
          </div>
          <div className="max-w-[40%] flex flex-row flex-wrap justify-end content-start mt-1 gap-2">
            <Tag Icon={Unity} title="Unity" color="black" />
            <Tag Icon={Blender} title="Blender" color="#d57132" />
            <Tag Icon={Unity} title="Unity" color="black" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <GitCommitIcon size={16} />
            <div className="font-light text-xs text-text-secondary -mt-[3px]">
              Last Commit 22.11.19
            </div>
          </div>
          <div className="flex flex-row flex-wrap-reverse justify-end gap-2">
            <Tag Icon={RepoIcon} title="Github" color="#393939" />
            <Tag Icon={Notion} title="Notion" color="#393939" />
          </div>
        </div>
      </div>
    </div>
  );
}
