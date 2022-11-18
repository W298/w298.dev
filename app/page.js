import ProjectCard from "../components/ProjectCard";

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <div className="text-xl font-semibold">Game Dev.</div>
        </div>
        <div className="flex flex-row flex-wrap gap-8">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <div className="text-xl font-semibold">Web Dev.</div>
        </div>
        <div className="flex flex-row flex-wrap gap-8">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
