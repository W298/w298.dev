import ProjectSidebar from "../../components/ProjectSidebar";
import Sidebar from "../../components/Sidebar";
import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";

export default function ProjectLayout({ children }) {
  const projectData = projectDataRaw as CategoryData[];

  return (
    <div className="max-w-[90rem] mt-[60px] m-auto flex flex-row gap-5">
      <Sidebar>
        <ProjectSidebar projectData={projectData} />
      </Sidebar>
      <div className="min-[700px]:ml-80 w-full">
        <div className="min-[1440px]:m-10 min-[700px]:m-8 m-5">{children}</div>
      </div>
    </div>
  );
}
