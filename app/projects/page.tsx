import { CategoryData } from "../../components/interface/ProjectDataInterface";
import projectDataRaw from "../../data/projectData.json";
import ProjectCard from "../../components/ProjectCard";
import SimpleProjectCard from "../../components/SimpleProjectCard";
import { PinIcon } from "@primer/octicons-react";

async function getLastCommit(mapped) {
  const routine = async (repoName) => {
    const res = await fetch("https://api.github.com/repos/w298/" + repoName, {
      next: {
        revalidate: 10,
      },
      headers: {
        Authorization: "token " + process.env.GITHUB_API_TOKEN,
      },
    });

    return res.json();
  };

  const result = {};
  for await (const data of mapped) {
    const raw = await routine(data.repoName);
    result[data.title] = raw["pushed_at"];
  }

  return result;
}

export default async function Page() {
  const projectData = projectDataRaw as CategoryData[];
  const lastCommitData = await getLastCommit(
    projectData
      .map(({ projectCardList }) => {
        return projectCardList.map(({ title, link }) => {
          let last = link.repo.lastIndexOf("/");
          return { title: title, repoName: link.repo.substring(last + 1) };
        });
      })
      .flat()
  );

  return (
    <div className="flex flex-col gap-14 pb-[85vh]">
      <div className="@container flex flex-col gap-5">
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
              <div className="text-xl font-bold">{categoryTitle}</div>
              {projectCardList.every(({ released }) => released != null) &&
                projectCardList.some(({ released }) => released) && (
                  <>
                    <div className="font-semibold">Released</div>
                    <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
                      {projectCardList
                        .filter(({ released }) => released)
                        .map((projectCardData) => {
                          return (
                            <ProjectCard
                              data={projectCardData}
                              lastCommit={lastCommitData[projectCardData.title]}
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
                      <ProjectCard
                        key={projectCardData.title}
                        data={projectCardData}
                        lastCommit={lastCommitData[projectCardData.title]}
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
