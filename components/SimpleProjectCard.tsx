import { ProjectCardData } from "./interface/ProjectDataInterface";
import { Tag } from "./Tag";

interface ProjectCardProp {
  data: ProjectCardData;
  lastCommit: Date;
}

export default function SimpleProjectCard({ data }: ProjectCardProp) {
  return (
    <div
      className="min-w-min rounded-md bg-layer-350 border border-layer-200 hover:border-layer-100 flex flex-row cursor-pointer transition"
      id={`projectCard-${data.title
        .replaceAll(" ", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .replaceAll("'", "")}-pinned`}
    >
      <div className="flex-1 flex flex-row px-3 py-2 justify-between align-middle">
        <div className="font-bold text-md">{data.title}</div>
        <div className="flex flex-row flex-wrap gap-2">
          <Tag title={data.tags[0]} />
        </div>
      </div>
    </div>
  );
}
