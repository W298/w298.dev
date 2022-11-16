import "../styles/globals.css";
import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Navbar />
        <div className="max-w-[90rem] m-auto">{children}</div>
      </body>
    </html>
  );
}
