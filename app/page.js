import ProjectCard from "../components/ProjectCard";

async function getProjectData() {
  const projectDataResponse = await fetch(
    "https://gist.githubusercontent.com/W298/356810e641769c5be81a1b8f3e394936/raw/projectData.json",
    {
      cache: "force-cache",
    }
  );

  return projectDataResponse.json();
}

export default async function Page() {
  const projectData = await getProjectData();

  return (
    <div className="flex flex-col gap-20 pb-[85vh]">
      {projectData.map(({ category, projectCardList }, index) => {
        return (
          <>
            {index != 0 && (
              <div className="my-4 bg-layer-200 w-full h-[1px]"></div>
            )}
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center gap-5">
                <div className="text-xl font-semibold">{category}</div>
              </div>
              <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
                {projectCardList.map((data) => {
                  return <ProjectCard data={data} />;
                })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
