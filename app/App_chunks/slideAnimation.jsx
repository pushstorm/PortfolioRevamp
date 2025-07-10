"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "keen-slider/keen-slider.min.css";
import RotatingHeader from "./rotating-Text.jsx";
import { motion } from "motion/react";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Zaaviyan",
    description:
      "Zaaviyan Contracting specializes in creating tailor-made interiors where beauty meets purpose.",
    src: "/projects/Zaaviyan.png",
    link: "https://zaaviyancontracting.com/",
    color: "rgb(254, 215, 170)",
    bgColor: "/zaaviyan.jpg",
    headText: "Crafting Custom Interiors Where Beauty Meets Purpose",
  },
  {
    title: "Menlocloud",
    description:
      "A story on the border between reality and imaginary, about the contradictory feelings of isolation.",
    src: "/projects/Menlocloud.png",
    link: "https://menlocloud.ai/",
    color: "rgb(14, 165, 233)",
    bgColor: "/menlocloud.jpg",
    headText:
      "A story between reality and imagination, shaped by the silence of isolation.",
  },
  {
    title: "BSHH",
    description:
      "Though he views photography as storytelling, Zissou’s images don’t insist on a narrative.",
    src: "/projects/BSHH.png",
    link: "https://bsholidayhomes.com/",
    color: "rgb(245, 188, 186)",
    bgColor: "/bshh.jpg",
    headText:
      "Though he views photography as storytelling, Zissou’s images don’t insist on a narrative.",
  },
  {
    title: "Interzens",
    description:
      "An ongoing project investigating how humans interact with the Danish coast.",
    src: "/projects/interzens.png",
    link: "https://interzens.com/",
    color: "#FF725E",
    bgColor: "/interzens.jpg",
    headText:
      "An ongoing project exploring human presence and interaction along the Danish coast.",
  },
  {
    title: "Bizgrowth",
    description:
      "Captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    src: "/projects/Bizgrowth.png",
    link: "https://bizgrowthconsultancy.com/",
    color: "#84cc16",
    bgColor: "/bizgrowth.jpg",
    headText:
      "Captured during a residency at Hektor, an old farm in Los Valles, Lanzarote.",
  },
];

const SliderA = () => {
  const containerRef = useRef(null);
  const holderRefs = useRef([]);
  const imgRefs = useRef([]);
  const [scrollActiveIndex, setScrollActiveIndex] = React.useState(0);
  const bgHolderRefs = useRef([]);
  const bgGradientRefs = useRef([]);
  const textContainerRef = useRef(null);
  const [textContainerHeight, setTextContainerHeight] = React.useState(0);
  const linkBtnRef = useRef(null);
  const [linkBtnHeight, setLinkBtnHeight] = React.useState(0);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 1 });

      const split = SplitText.create(".textAnimate", {
        type: "words",
        aria: "hidden",
      });

      gsap.from(split.words, {
        y: 200,
        rotate: 14,
        ease: "elastic.out(.3,0.45)",
        stagger: 0.07,
        duration: 1.4,
        delay: 0.25,
        scrollTrigger: {
          trigger: "textAnimate",
          start: "top 80%",
          end: "top 20%",
        },
      });
      return () => split.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [scrollActiveIndex]);
  useEffect(() => {
    const container = containerRef.current;
    const projectCount = projects.length;
    const textContainer = textContainerRef.current;
    const linkBtn = linkBtnRef.current;
    if (textContainer) {
      const textContainerHeight = textContainer.offsetHeight;
      setTextContainerHeight(textContainerHeight);
    }
    if (linkBtn) {
      const linkBtnHeight = linkBtn.offsetHeight;
      setLinkBtnHeight(linkBtnHeight);
    }

    const handleScroll = () => {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + window.innerHeight;

      // Calculate progress only when in view
      if (
        scrollBottom >= containerTop &&
        scrollTop <= containerTop + containerHeight
      ) {
        const scrollProgress =
          (scrollTop - containerTop) / (containerHeight - window.innerHeight);

        const activeIndex = Math.floor(scrollProgress * projectCount);

        if (activeIndex >= 0 && activeIndex < projectCount) {
          setScrollActiveIndex(activeIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjectIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const sectionHeight = window.innerHeight;
    let scrollTarget = container.offsetTop + sectionHeight * index;

    // Clamp to max scrollable height
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (scrollTarget > maxScroll) scrollTarget = maxScroll;

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  };
  const prevIndex = useRef(scrollActiveIndex); // initialize with first index

  useEffect(() => {
    const current = scrollActiveIndex;
    const previous = prevIndex.current;

    if (current === previous || current < 0 || previous < 0) return;

    const holder = holderRefs.current[scrollActiveIndex];
    const img = imgRefs.current[scrollActiveIndex];

    const holder2 = bgHolderRefs.current[scrollActiveIndex]; // Fixed!
    const img2 = bgGradientRefs.current[scrollActiveIndex];

    if (holder && img) {
      const tl = gsap.timeline();

      if (previous > current) {
        // SCROLLING UP
        tl.fromTo(
          holder,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.3, delay: 0.18, ease: "power4.out" }
        ).fromTo(
          img,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.3, ease: "power4.out" },
          "<"
        );
      } else {
        // SCROLLING DOWN
        tl.fromTo(
          holder,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.3, ease: "power4.out" }
        ).fromTo(
          img,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.3, ease: "power4.out" },
          "<"
        );
      }
    }

    if (holder2 && img2) {
      const tl2 = gsap.timeline();

      if (previous > current) {
        // SCROLLING UP
        tl2
          .fromTo(
            holder2,
            { yPercent: -100 },
            { yPercent: 0, duration: 0.4, ease: [0.95, 0.05, 0.795, 0.035] }
          )
          .fromTo(
            img2,
            { yPercent: 100, scale: 2 },
            {
              yPercent: 0,
              scale: 1,
              duration: 0.4,
              ease: [0.95, 0.05, 0.795, 0.035],
            },
            "<"
          );
      } else {
        // SCROLLING DOWN
        tl2
          .fromTo(
            holder2,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.4, ease: [0.95, 0.05, 0.795, 0.035] }
          )
          .fromTo(
            img2,
            { yPercent: -100, scale: 2 },
            {
              yPercent: 0,
              scale: 1,
              duration: 0.4,
              ease: [0.95, 0.05, 0.795, 0.035],
            },
            "<"
          );
      }
    }

    prevIndex.current = current;
  }, [scrollActiveIndex]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 1 });

      const splitFront = SplitText.create("textFront", {
        type: "chars",
      });
      const splitBack = SplitText.create("textBack", {
        type: "chars",
      });

      return () => {
        splitFront.revert();
        splitBack.revert();
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);
  console.log(scrollActiveIndex);
  return (
    <section
      ref={containerRef}
      style={{ height: `${projects.length * 100}vh` }}
      className="relative w-screen"
    >
      <div className="sticky  overflow-hidden trigger-point h inset-0 h-screen w-full flex items-center justify-center text-white">
        <div className="w-full h-full z-20 absolute inset-0 bg-slate-900/60" />
        <div className="absolute  top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2  opacity-60 z-20">
          <h2
            key={scrollActiveIndex}
            className="textAnimate text-center text-6xl overflow-hidden tracking-tighter"
          >
            {projects[scrollActiveIndex].headText}
          </h2>
        </div>
        <div className="absolute  inset-0 w-full h-full overflow-hidden z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                zIndex:
                  index === scrollActiveIndex
                    ? 10
                    : index === prevIndex.current
                    ? 9
                    : 0,
              }}
              ref={(el) => (bgHolderRefs.current[index] = el)}
            >
              <img
                ref={(el) => (bgGradientRefs.current[index] = el)}
                src={`project-images${project.bgColor}`}
                alt={`${project.title}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div
          style={{
            height: textContainerHeight ? textContainerHeight : 0,
          }}
          className="absolute bottom-12 left-10 z-20 "
        >
          <div className="overflow-hidden">
            <div
              style={{
                height: textContainerHeight ? textContainerHeight : 0,
              }}
              className="!mb-3  rounded-xl overflow-hidden aspect-video relative"
            >
              <div className="w-full h-full absolute inset-0 bg-slate-900/20 z-20" />
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (holderRefs.current[index] = el)}
                  className="holder absolute inset-0 w-full rounded-xl h-full overflow-hidden"
                  style={{
                    zIndex:
                      index === scrollActiveIndex
                        ? 10
                        : index === prevIndex.current
                        ? 9
                        : 0,
                  }}
                >
                  <img
                    ref={(el) => (imgRefs.current[index] = el)}
                    src={project.src}
                    alt=""
                    className="reveal-img w-full h-full object-fit"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={textContainerRef}
          className="absolute bottom-12 right-12  z-20"
        >
          {projects.map((title, id) => (
            <motion.button
              animate={{ x: scrollActiveIndex === id ? "-30%" : "0%" }}
              transition={{ ease: [0.175, 0.885, 0.32, 1.1], duration: 0.5 }}
              key={id}
              onClick={() => scrollToProjectIndex(id)}
              className={`${
                scrollActiveIndex === id ? "opacity-[1]" : "opacity-[.4]"
              } block text-4xl tracking-tight font-[300] text-slate-100 ${
                id !== 5 - 1 ? "mb-4" : ""
              }`}
            >
              {title.title}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SliderA;
