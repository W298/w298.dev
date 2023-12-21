import ProjectSidebar from "../../components/ProjectSidebar";
import Sidebar from "../../components/Sidebar";
import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";

export default function ProjectLayout({ children }) {
  const projectData = projectDataRaw as CategoryData[];

  return (
    <>
      <Sidebar>
        <ProjectSidebar projectData={projectData} />
      </Sidebar>
      <div className="min-[790px]:ml-80 w-full">
        <div className="min-[790px]:m-8 m-5">{children}</div>
      </div>
    </>
  );
}
