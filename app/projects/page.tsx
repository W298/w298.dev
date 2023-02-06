import ProjectCard from "../../components/ProjectCard";
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
  const projectData: CategoryData[] = await getProjectData();
  const lastCommitData = await getLastCommit(
    projectData
      .map(({ projectCardList }) => {
        return projectCardList.map(({ title, repo }) => {
          let last = repo.lastIndexOf("/");
          return { title: title, repoName: repo.substring(last + 1) };
        });
      })
      .flat()
  );

  return (
    <div className="flex flex-col gap-16 pb-[85vh]">
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
                  <div className="font-semibold">Released</div>
                )}
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
