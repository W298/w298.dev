export default function Tag({ Icon, title, color, thin = false }) {
  return (
    <div
      className="flex flex-row h-min items-center py-0.25 px-1.5 rounded-full select-none cursor-pointer"
      style={{ backgroundColor: color }}
    >
      <Icon color="white" className="p-1 w-6 h-6" />
      {!thin && <div className="font-bold text-xs p-1">{title}</div>}
    </div>
  );
}
