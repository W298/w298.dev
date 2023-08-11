import Sidebar from "../../components/Sidebar";

export default function AboutMeLayout({ children }) {
  return (
    <div className="max-w-[90rem] m-auto flex flex-row gap-5">
      <Sidebar></Sidebar>
      <div className="min-[700px]:ml-80 w-full">
        <div className="min-[1440px]:m-10 min-[700px]:m-8 m-5">{children}</div>
      </div>
    </div>
  );
}
