import Sidebar from "../../components/Sidebar";

export default function AboutMeLayout({ children }) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="min-[900px]:ml-[19rem] w-full">
        <div className="min-[900px]:mx-14 min-[900px]:my-12 m-5">
          {children}
        </div>
      </div>
    </>
  );
}
