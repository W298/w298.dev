import Sidebar from "./Sidebar";

async function getProjectData() {
  const projectDataResponse = await fetch(
    "https://gist.githubusercontent.com/W298/356810e641769c5be81a1b8f3e394936/raw/projectData.json",
    {
      cache: "force-cache",
    }
  );

  return projectDataResponse.json();
}

export default async function SidebarContainer() {
  const projectData = await getProjectData();
  return <Sidebar projectData={projectData} />;
}
