import { Blender, Unity, Github, Notion } from "@icons-pack/react-simple-icons";
import { RepoIcon } from "@primer/octicons-react";

export default function Tag({ title, color, thin = false }) {
  let Icon = Github;
  switch (title) {
    case "Unity":
      Icon = Unity;
      break;
    case "Blender":
      Icon = Blender;
      break;
    case "Github":
      Icon = RepoIcon;
      break;
    case "Notion":
      Icon = Notion;
      break;
  }

  return (
    <div
      className="flex flex-row h-min items-center py-0.25 px-1.5 rounded-full select-none"
      style={{ backgroundColor: color }}
    >
      <Icon color="white" className="p-1 w-6 h-6" />
      {!thin && <div className="font-bold text-xs p-1">{title}</div>}
    </div>
  );
}
