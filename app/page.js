import ProjectCard from "../components/ProjectCard";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 pb-[85%]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <div className="text-xl font-semibold">Game developement</div>
        </div>
        <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
          <ProjectCard title="Intersection" />
          <ProjectCard title="Together" />
          <ProjectCard title="Pixel Reversi" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <div className="text-xl font-semibold">Web Dev.</div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <ProjectCard title="Today's Genshin" />
        </div>
      </div>
    </div>
  );
}
