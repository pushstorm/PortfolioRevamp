//@ts-nocheck
"use client";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import {
  animate,
  scroll,
  spring,
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ArrowsOutSimple, ArrowUpRight, Check, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurOverlay from "./blurOverlay";
gsap.registerPlugin(ScrollTrigger);
export default function HorizontalScroll(): JSX.Element {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const projects = [
    {
      title: "Zaaviyan",
      description:
        "Zaaviyan Contracting specializes in creating tailor-made interiors where beauty meets purpose. As a premier fit-out company, we redefine residential, commercial, and hospitality spaces with visionary design and meticulous execution. From the first sketch to the final detail, we deliver environments that inspire — driven by creativity, precision, and an unwavering dedication to excellence.",
      src: "/projects/Zaaviyan.png",
      link: "/",
      color: "rgb(254, 215, 170)",
    },
    {
      title: "Menlocloud",
      description:
        "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.",
      src: "/projects/Menlocloud.png",
      link: "/",
      color: "rgb(14, 165, 233)",
    },
    {
      title: "BSHH",
      description:
        "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.",
      src: "/projects/BSHH.png",
      link: "/",
      color: "rgb(245, 188, 186)",
    },
    {
      title: "Interzens",
      description:
        "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
      src: "/projects/interzens.png",
      link: "/",
      color: "#FF725E",
    },
    {
      title: "Bizgrowth",
      description:
        "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
      src: "/projects/Bizgrowth.png",
      link: "/",
      color: "#84cc16",
    },
  ];
  useEffect(() => {
    const items = document.querySelectorAll("li");
    const length = projects.length - 1;
    if (ulRef.current) {
      const controls = animate(
        ulRef.current,
        {
          transform: ["none", `translateX(-${length * 100}vw)`],
        },
        { easing: spring() }
      );
      scroll(controls, { target: document.querySelector("section") });
    }

    // const segmentLength = 1 / items.length;
    // items.forEach((item, i) => {
    //   const header = item.querySelector("h2");

    //   if (header) {
    //     scroll(animate(header, { x: [400, -400] }), {
    //       target: document.querySelector("section"),
    //       offset: [
    //         [i * segmentLength, 1],
    //         [(i + 1) * segmentLength, 0],
    //       ],
    //     });
    //   }
    // });
  }, []);

  const [isExpand, setIsExpand] = useState(false);
  const textRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      {
        left: "50%",
        xPercent: -50,
      },
      {
        left: "0%",
        xPercent: 0, // end aligned to left
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "start center",
          end: "start end",
          scrub: 1.25,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      <div className="container">
        <div className="pt-14 h-[130px] relative mb-5 ">
          <motion.h1
            ref={headingRef}
            className="text-3xl absolute left-1/2 lg:text-5xl  xl:text-6xl font-[500] "
          >
            Project Undefined
          </motion.h1>
        </div>
      </div>

      <section
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 w-screen bg-fuchsia-200">
          <div className="overflow-hidden">
<ul
              ref={ulRef}
              className="flex bg-yellow-300"
              style={{
                width: `${projects.length * 100}vw`,
                background: `linear-gradient(to right, ${projects[0].color}, ${projects[1].color}, ${projects[2].color}, ${projects[3].color}, ${projects[4].color})`,
              }}
            >
              {projects.map((project, idx) => (
                <li key={idx} className="h-screen w-screen relative p-10">
                  <div
                    className={`w-full h-full flex flex-col transition-all duration-300 ease-[cubic-bezier(0.175, 0.885, 0.32, 1.1)]  ${
                      isExpand ? "justify-center" : "justify-center"
                    }  relative items-center`}
                  >
                    <div className="">
                      <div className="relative ">
                        <motion.img
                          src={project.src}
                          className={`w-[380px] xl:w-[80vw] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.175, 0.885, 0.32, 1.1)] `}
                          alt={project.title}
                        />
                        <AnimatePresence mode="wait">
                          {isExpand && <BlurOverlay />}
                        </AnimatePresence>
                        <div className="flex absolute bottom-5 right-5 gap-5">
                          <motion.div
                            layout
                            animate={{
                              width: isExpand ? 400 : 200,
                              height: isExpand ? 200 : 60,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: [0.19, 1, 0.22, 1],
                            }}
                            className={`
                        ${
                          isExpand ? "bg-white" : "bg-white"
                        } backdrop-filter backdrop-blur-lg 
                          px-5 py-2 rounded-2xl
                        `}
                          >
                            <div
                              className={`flex items-center gap-4 justify-between`}
                            >
                              <h2
                                className={` font-semibold ${
                                  isExpand ? "text-3xl" : "text-xl"
                                } relative text-slate-950`}
                              >
                                {project.title}
                              </h2>
                              <button onClick={() => setIsExpand(!isExpand)}>
                                <motion.div
                                  animate={{ rotate: isExpand ? 90 : 0 }}
                                  transition={{
                                    ease: [0.19, 1, 0.22, 1],
                                    delay: 0.16,
                                  }}
                                  className={`w-10 h-10 flex justify-center items-center ${
                                    isExpand
                                      ? "bg-slate-100/20 hover:bg-red-400"
                                      : "bg-slate-200 hover:bg-slate-300"
                                  } rounded-full`}
                                >
                                  {isExpand ? (
                                    <X className="text-xl" />
                                  ) : (
                                    <ArrowsOutSimple className="text-xl" />
                                  )}
                                </motion.div>
                              </button>
                            </div>

                            {isExpand ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                                className="text-slate-950"
                              >
                                <p ref={textRef} className="mt-2">
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Dolores consectetur
                                  voluptate beatae blanditiis
                                </p>

                                <ul className="flex items-center gap-3 mt-3">
                                  {Array.from({ length: 3 }).map((_, idx) => (
                                    <li key={idx}>
                                      <div className="w-10 h-10 bg-red-300 rounded-full"></div>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ) : null}
                          </motion.div>
                          <button className="text-xl font-semibold self-end flex items-center gap-3 bg-white rounded-2xl px-6 h-[60px]">
                            Visit <ArrowUpRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>            
        </div>
      </section>
    </div>
  );
}
