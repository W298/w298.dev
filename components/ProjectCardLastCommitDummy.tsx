import { GitCommitIcon } from "@primer/octicons-react";

export default async function ProjectCardLastCommitDummy() {
  return (
    <div className="flex flex-row gap-2 items-center -mb-[1px]">
      <GitCommitIcon size={16} />
      <div className="font-light text-xs text-text-secondary -mt-[5px]">
        Last Commit - No_Info
      </div>
    </div>
  );
}
