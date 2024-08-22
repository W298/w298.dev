import { GitCommitIcon } from "@primer/octicons-react";

async function getRepoInfo(repoName) {
  const res = await fetch("https://api.github.com/repos/w298/" + repoName, {
    next: {
      revalidate: 10,
    },
    headers: {
      Authorization: "token " + process.env.GITHUB_API_TOKEN,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectCardLastCommit({ repoLink }) {
  const repoInfo = repoLink
    ? await getRepoInfo(repoLink.substring(repoLink.lastIndexOf("/") + 1))
    : null;

  return (
    <div className="flex flex-row gap-2 items-center" title="Last commit date">
      <GitCommitIcon size={16} />
      <div className="font-light text-xs text-text-secondary -mt-[1px]">
        {repoInfo == null
          ? "No_Info"
          : repoInfo["pushed_at"].toString().substring(2, 10)}
      </div>
    </div>
  );
}
