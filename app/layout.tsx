import "../styles/globals.css";

import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "../components/Analytics";

export default async function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>W298.dev</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
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
      <body className="max-w-[100%] overflow-x-hidden">
        <Navbar />
        <ScrollToTop />
        <div className="max-w-[110rem] mt-[50px] m-auto flex flex-row gap-5">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
