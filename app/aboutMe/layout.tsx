import Sidebar from "../../components/Sidebar";

export default function AboutMeLayout({ children }) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="min-[790px]:ml-80 w-full">
        <div className="min-[790px]:m-8 m-5">{children}</div>
      </div>
    </>
  );
}
