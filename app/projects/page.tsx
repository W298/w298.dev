import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";
import ProjectCardServer from "../../components/ProjectCardServer";
import Contribution from "../../components/Contribution";
import { Github } from "@icons-pack/react-simple-icons";

export default function Page() {
  const projectData = projectDataRaw as CategoryData[];

  return (
    <div className="flex flex-col gap-12 pb-[85vh]">
      <div className="@container flex flex-col gap-3 bg-layer-400 p-4 rounded-md overflow-hidden relative h-[205px]">
        <div className="flex flex-row gap-3">
          <div className="flex items-center">
            <Github width={20} />
          </div>
          <div className="text-lg font-bold">Contributions</div>
        </div>
        <Contribution />
      </div>
      {projectData.map(({ categoryTitle, projectCardList }, index) => {
        return (
          <>
            {index != 0 && (
              <div className="my-4 bg-layer-200 w-full h-[1px]"></div>
            )}
            <div className="flex flex-col gap-5">
              <div className="flex flex-row justify-between align-middle">
                <div className="text-xl font-bold">{categoryTitle}</div>
              </div>
              {projectCardList.every(({ released }) => released != null) &&
                projectCardList.some(({ released }) => released) && (
                  <>
                    <div className="font-semibold">Released</div>
                    <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-5">
                      {projectCardList
                        .filter(({ released }) => released)
                        .map((projectCardData, i) => {
                          return (
                            <ProjectCardServer
                              key={projectCardData.title}
                              data={projectCardData}
                            />
                          );
                        })}
                    </div>
                  </>
                )}
              {projectCardList.every(({ released }) => released != null) &&
                projectCardList.some(({ released }) => !released) && (
                  <div className="font-semibold pt-8">
                    Currently Developing 🛠️
                  </div>
                )}
              <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-5">
                {projectCardList
                  .filter(({ released }) => !released)
                  .map((projectCardData) => {
                    return (
                      <ProjectCardServer
                        key={projectCardData.title}
                        data={projectCardData}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
