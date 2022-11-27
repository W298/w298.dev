import SidebarContainer from "../../components/SidebarContainer";

export default function AboutMeLayout({ children }) {
  return (
    <div className="max-w-[90rem] m-auto flex flex-row gap-5">
      <SidebarContainer></SidebarContainer>
      <div className="min-[700px]:ml-80 w-full">
        <div className="m-8">{children}</div>
      </div>
    </div>
  );
}
