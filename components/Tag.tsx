import { Icon as OcticonIconType } from "@primer/octicons-react";
import { IconType } from "@icons-pack/react-simple-icons";
import iconData from "../data/iconData.json";

interface TagProp {
  title: string;
}

interface CustomTag extends TagProp {
  Icon: OcticonIconType | IconType;
  color: string;
}

export function Tag({ title }: TagProp) {
  const { src, color } = iconData[title] ?? { src: "", color: "black" };
  return (
    <div
      className={`flex flex-row h-min items-center px-1 py-0.25 rounded-full select-none`}
      style={{ backgroundColor: color }}
    >
      <img height="24" width="24" className="p-1 w-6 h-6" src={src} />
    </div>
  );
}

export function CustomTag({ Icon, title, color }: CustomTag) {
  return (
    <div
      className="flex flex-row h-min items-center py-0.25 px-1.5 rounded-full select-none"
      style={{ backgroundColor: color }}
    >
      <Icon color="white" className="p-1 w-6 h-6" />
      <div className="font-bold text-xs p-1">{title}</div>
    </div>
  );
}
