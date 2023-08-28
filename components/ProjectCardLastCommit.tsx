import { GitCommitIcon } from "@primer/octicons-react";

async function getLastCommit(repoName) {
  const res = await fetch("https://api.github.com/repos/w298/" + repoName, {
    next: {
      revalidate: 10,
    },
    headers: {
      Authorization: "token " + process.env.GITHUB_API_TOKEN,
    },
  });

  return res.json()["pushed_at"];
}

export default async function ProjectCardLastCommit({ repoLink }) {
  const lastCommit = repoLink
    ? await getLastCommit(repoLink.substring(repoLink.lastIndexOf("/") + 1))
    : null;

  return (
    <div className="flex flex-row gap-2 items-center -mb-[1px]">
      <GitCommitIcon size={16} />
      <div className="font-light text-xs text-text-secondary -mt-[5px]">
        {`Last Commit - ${
          lastCommit == null
            ? "No_Info"
            : lastCommit.toString().substring(0, 10)
        } `}
      </div>
    </div>
  );
}
