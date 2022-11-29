import ProjectSidebar from "../../components/ProjectSidebar";
import Sidebar from "../../components/Sidebar";
import { CategoryData } from "../../components/interface/ProjectDataInterface";

async function getProjectData() {
  const projectDataResponse = await fetch(
    "https://gist.githubusercontent.com/W298/356810e641769c5be81a1b8f3e394936/raw/projectData.json",
    {
      cache: "force-cache",
    }
  );

  return projectDataResponse.json();
}

export default async function ProjectLayout({ children }) {
  const projectData: CategoryData[] = await getProjectData();

  return (
    <div className="max-w-[90rem] m-auto flex flex-row gap-5">
      <Sidebar>
        <ProjectSidebar projectData={projectData} />
      </Sidebar>
      <div className="min-[700px]:ml-80 w-full">
        <div className="m-8">{children}</div>
      </div>
    </div>
  );
}
