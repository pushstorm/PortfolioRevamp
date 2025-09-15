"use client";
import React from "react";
import Scrollbar from "./App_chunks/scroll-bar";
import "./locomotiveScroll.css";
import Loading from "./App_chunks/Loading.jsx";
import { Marquee } from "./App_chunks/Marquee.jsx";
import { AnimatePresence } from "motion/react";
import ImgParallax from "./App_chunks/imgParallax.jsx";
import About from "./App_chunks/About.jsx";
import Services from "./App_chunks/Services.jsx";
import Footer from "./App_chunks/Footer.jsx";
import Hero from "./App_chunks/hero.jsx";
import { useLoading } from "./Context/LoadingContext";
import SlideAnimation from "./App_chunks/slideAnimation.jsx";
const Page = () => {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <>
            <Hero />
            <Scrollbar />
            <Marquee />
            <About /> 
            <ImgParallax />
            <Services />
            <SlideAnimation />
            <Footer />
          </>
        ) : (
          <Loading setIsLoading={setIsLoading} />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Page;
