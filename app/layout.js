import "../styles/globals.css";
import Navbar from "../components/Navbar";
import SidebarContainer from "../components/SidebarContainer";

export default async function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <head />
      <body>
        <div
          style={{
            background: "linear-gradient(43deg, #4158D0, #C850C0, #FFCC70)",
            width: "100%",
            height: "4px",
          }}
        ></div>
        <Navbar />
        <div className="max-w-[90rem] m-auto flex flex-row gap-5">
          <SidebarContainer />
          <div className="min-[700px]:ml-80 w-full">
            <div className="m-8">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
