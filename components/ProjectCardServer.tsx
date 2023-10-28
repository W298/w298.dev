import { Suspense } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardLastCommit from "./ProjectCardLastCommit";
import { ProjectCardData } from "./interface/ProjectDataInterface";
import ProjectCardLastCommitDummy from "./ProjectCardLastCommitDummy";

interface ProjectCardServerProp {
  data: ProjectCardData;
  hoverTooltip: Boolean;
}

export default async function ProjectCardServer({
  data,
  hoverTooltip,
}: ProjectCardServerProp) {
  return (
    <ProjectCard
      data={data}
      lastCommitNode={
        <Suspense fallback={<ProjectCardLastCommitDummy />}>
          <ProjectCardLastCommit repoLink={data.link.repo} />
        </Suspense>
      }
      hoverTooltip={hoverTooltip}
    />
  );
}
