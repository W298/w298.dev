export default function Navbar() {
  return (
    <div className="sticky top-0 py-4 px-8 backdrop-blur-sm bg-slate-900/75 border-b border-slate-800">
      <div className="max-w-[90rem] m-auto">
        <div className="font-nexa font-extrabold text-3xl text-white pl-1">
          W298.me
        </div>
        <div className="flex flex-row gap-4 mt-2">
          {["Projects", "Posts", "About Me"].map((title) => {
            return (
              <div className="font-nexa text-sm text-white bg-slate-800 px-3 py-1 rounded-full cursor-pointer border border-transparent hover:border-slate-300">
                {title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
