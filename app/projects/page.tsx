import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";
import SimpleProjectCard from "../../components/SimpleProjectCard";
import { PinIcon } from "@primer/octicons-react";
import ProjectCardServer from "../../components/ProjectCardServer";

export default function Page() {
  const projectData = projectDataRaw as CategoryData[];

  return (
    <div className="flex flex-col gap-14 pb-[85vh]">
      <div className="@container flex flex-col gap-5 bg-layer-400 p-5 rounded-md">
        <div className="flex flex-row gap-2">
          <div className="">
            <PinIcon />
          </div>
          <div className="text-xl font-bold">Pinned</div>
        </div>
        <div className="grid @[800px]:grid-cols-3 @[500px]:grid-cols-2 @[350px]:grid-cols-1 gap-x-4 gap-y-3">
          {projectData.map(({ projectCardList }) => {
            return projectCardList
              .filter((c) => c.pinned)
              .map((c) => {
                return <SimpleProjectCard data={c} />;
              });
          })}
        </div>
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
                    <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
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
              <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
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
