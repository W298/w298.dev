import "../styles/globals.css";
import Navbar from "../components/Navbar";
import SidebarContainer from "../components/SidebarContainer";

export default async function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navbar />
        <div className="max-w-[90rem] m-auto flex flex-row gap-5">
          <SidebarContainer />
          <div className="min-[700px]:ml-80">
            <div className="m-8">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
