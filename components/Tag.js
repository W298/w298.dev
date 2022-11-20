import { Blender, Unity } from "@icons-pack/react-simple-icons";

export default function Tag({ title, color, thin = false }) {
  const Icon = title == "Unity" ? Unity : "Blender" ? Blender : null;

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
