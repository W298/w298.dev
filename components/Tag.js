import iconData from "../data/iconData.json";

export function Tag({ title, thin = true }) {
  const { src, color } = iconData[title] ?? { src: "", color: "black" };
  return (
    <div
      className={`flex flex-row h-min items-center px-1 py-0.25 rounded-full select-none ${
        thin ? "" : "w-[5.8rem]"
      }`}
      style={{ backgroundColor: color }}
    >
      <img height="24" width="24" className="p-1 w-6 h-6" src={src} />
      {!thin && <div className="font-bold text-[0.75rem] px-1">{title}</div>}
    </div>
  );
}

export function CustomTag({ Icon, title, color, thin = false }) {
  return (
    <div
      className="flex flex-row h-min items-center py-0.25 px-1.5 rounded-full select-none px-1.5"
      style={{ backgroundColor: color }}
    >
      <Icon color="white" className="p-1 w-6 h-6" />
      {!thin && <div className="font-bold text-xs p-1">{title}</div>}
    </div>
  );
}
