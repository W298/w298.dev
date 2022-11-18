import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navbar />
        <div className="max-w-[90rem] m-auto flex flex-row gap-5">
          <Sidebar />
          <div className="ml-80">
            <div className="m-8">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
