export default function ProjectTag({ Icon, title, color }) {
  return (
    <div
      className="flex flex-row items-center py-0.25 px-1.5 rounded-full select-none"
      style={{ backgroundColor: color }}
    >
      <Icon color="white" className="p-1 w-6 h-6" />
      <div className="font-bold text-xs p-1">{title}</div>
    </div>
  );
}
