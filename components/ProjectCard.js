import { Unity, Blender } from "@icons-pack/react-simple-icons";
import ProjectTag from "./ProjectTag";

export default function ProjectCard() {
  return (
    <div className="min-w-min max-w-[20.65rem] rounded-md bg-layer-350 border border-layer-200">
      <img
        src="https://w298.me/static/media/bgImg.57b3dfc9.png"
        className="object-cover h-28 rounded-t-md"
      ></img>
      <div className="py-4 px-4 flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <ProjectTag Icon={Unity} title="Unity" color="black" />
          <ProjectTag Icon={Blender} title="Blender" color="#d57132" />
        </div>
        <div className="font-extrabold text-2xl">Intersection</div>
        <div>
          <div className="font-light text-sm">Road Management Game</div>
          <div className="font-light text-sm">Develop With Unity</div>
        </div>
      </div>
    </div>
  );
}
