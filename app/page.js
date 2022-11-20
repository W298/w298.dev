import ProjectCard from "../components/ProjectCard";
import { projectData } from "../db/ProjectData";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 pb-[85%]">
      {projectData.map(({ category, projectCardList }) => {
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
              <div className="text-xl font-semibold">{category}</div>
            </div>
            <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
              {projectCardList.map((data) => {
                return <ProjectCard data={data} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
