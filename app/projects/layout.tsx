import ProjectSidebar from "../../components/ProjectSidebar";
import Sidebar from "../../components/Sidebar";
import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";

export default function ProjectLayout({ children }) {
  const projectData = projectDataRaw as CategoryData[];

  return (
    <div className="max-w-[90rem] m-auto flex flex-row gap-5">
      <Sidebar>
        <ProjectSidebar projectData={projectData} />
      </Sidebar>
      <div className="min-[700px]:ml-80 w-full">
        <div className="m-10">{children}</div>
      </div>
    </div>
  );
}
