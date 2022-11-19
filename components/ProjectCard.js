import { Unity, Blender, Notion } from "@icons-pack/react-simple-icons";
import { RepoIcon, GitCommitIcon } from "@primer/octicons-react";
import ProjectTag from "./ProjectTag";

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
      <div className="h-40 p-6 flex flex-row items-center justify-between gap-8">
        <div className="h-full flex flex-col justify-between">
          <div className="font-extrabold text-2xl">{title}</div>
          <div>
            <div className="font-light text-sm">Road Management Game</div>
            <div className="font-light text-sm">Develop With Unity</div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <GitCommitIcon size={16} />
            <div className="font-light text-xs text-text-secondary -mt-[3px]">
              Last Commit 22.11.19
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[45%] h-full justify-between items-end">
          <div className="flex flex-row flex-wrap-reverse justify-end gap-1">
            <ProjectTag Icon={Unity} title="Unity" color="black" />
            <ProjectTag Icon={Blender} title="Blender" color="#d57132" />
            <ProjectTag Icon={Unity} title="Unity" color="black" />
            <ProjectTag Icon={Unity} title="Unity" color="black" />
            <ProjectTag Icon={Blender} title="Blender" color="#d57132" />
            <ProjectTag Icon={Unity} title="Unity" color="black" />
            <ProjectTag Icon={Blender} title="Blender" color="#d57132" />
            <ProjectTag Icon={Unity} title="Unity" color="black" />
          </div>
          <div className="w-full h-[1px] bg-layer-200"></div>
          <div className="flex flex-row flex-wrap-reverse justify-end gap-1">
            <ProjectTag Icon={RepoIcon} title="Github" color="#393939" full />
            <ProjectTag Icon={Notion} title="Notion" color="#393939" full />
          </div>
        </div>
      </div>
    </div>
  );
}
