import { CategoryData } from "../../../components/interface/ProjectDataInterface";
import ScreenshotExplorer from "../../../components/ScreenshotExplorer";

async function getProjectData() {
  const projectDataResponse = await fetch(
    "https://gist.githubusercontent.com/W298/356810e641769c5be81a1b8f3e394936/raw/projectData.json",
    {
      cache: "force-cache",
    }
  );

  return projectDataResponse.json();
}

export default async function Page({ params }) {
  const projectData: CategoryData[] = await getProjectData();

  return (
    <ScreenshotExplorer
      data={projectData
        .find(({ projectCardList }) =>
          projectCardList.some(({ title }) => title == params.title)
        )
        ?.projectCardList.find(({ title }) => title == params.title)}
    />
  );
}
