import "../styles/globals.css";

import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "../components/Analytics";

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
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
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
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
