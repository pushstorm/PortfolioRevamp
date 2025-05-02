"use client";
import React, { useRef, useState } from "react";
import Hero from "./App_chunks/hero.js";
import "./locomotiveScroll.css";
import Loading from "./App_chunks/Loading.jsx";
import { Marquee } from "./App_chunks/Marquee.jsx";
import { AnimatePresence } from "framer-motion";
import ImgParallax from "./App_chunks/imgParallax.jsx";
import About from "./App_chunks/About.jsx";
import Services from "./App_chunks/Services.jsx";
import Footer from "./App_chunks/Footer.jsx";
import ScrollCardProject from "./App_chunks/ScrollCard.jsx";

const Page = () => {
  const hero = useRef(null);
  const marquee = useRef(null);
  const responsive = useRef(null);
  const footer = useRef(null);
  const des = useRef(null);
  const workProcess = useRef(null);
  const project = useRef(null);
  const strip = useRef(null);

  const refStore = {
    heroRef: {
      ref: hero,
    },
    marqueeRef: {
      ref: marquee,
    },
    responsiveRef: {
      ref: responsive,
    },
    footerRef: {
      ref: footer,
    },
    desRef: {
      ref: des,
    },
    workProcessRef: {
      ref: workProcess,
    },
    stripRef: {
      ref: strip,
    },
    projectRef: {
      ref: project,
    },
  };
  const [isLoading, setIsLoading] = useState(true);

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <>
            <Hero ref={refStore.heroRef.ref} refStore={refStore} />
            <Marquee />
            <About />
            <ImgParallax />
            <Services />
            <ScrollCardProject />
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
