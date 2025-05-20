import "./globals.css";
import ReactLenis from "lenis/react";
import Header from "./App_chunks/header";
import { Pacifico } from "next/font/google";
import Backtotop from "./App_chunks/Backtotop";
import Scrollbar from "./App_chunks/scroll-bar";
import HeroBG from "./App_chunks/heroBG";
import { LoadingProvider } from "./Context/LoadingContext.jsx";

export const metadata = {
  title: "Protfolio Faheem",
  description: "Portfolio",
};

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico", // 👈 important: set a CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,700,800,900&f[]=satoshi@300,301,400,401,500,501,700,701,900&f[]=work-sans@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={` relative antialiased ${pacifico.variable}`}>
        <Scrollbar />
        <LoadingProvider>
          <Backtotop />
          <HeroBG />
          <ReactLenis
            root
            options={{
              wheelMultiplier: 0.6, // default is 1, lower = slower scroll
              smooth: true,
            }}
          >
            <Header />

            {children}
          </ReactLenis>
        </LoadingProvider>
      </body>
    </html>
  );
}
