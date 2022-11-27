import ProjectSidebarContainer from "./ProjectSidebarContainer";
import Sidebar from "./Sidebar";

export default async function SidebarContainer({ children }) {
  return <Sidebar>{children}</Sidebar>;
}
