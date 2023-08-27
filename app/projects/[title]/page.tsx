import { CategoryData } from "../../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../../data/projectData.json";
import ScreenshotExplorer from "../../../components/ScreenshotExplorer";

export default function Page({ params }) {
  const projectData = projectDataRaw as CategoryData[];
  return (
    <ScreenshotExplorer
      data={projectData
        .find(({ projectCardList }) =>
          projectCardList.some(
            ({ title }) =>
              title == decodeURI(params.title).replaceAll("%3A", ":")
          )
        )
        ?.projectCardList.find(
          ({ title }) => title == decodeURI(params.title).replaceAll("%3A", ":")
        )}
    />
  );
}
