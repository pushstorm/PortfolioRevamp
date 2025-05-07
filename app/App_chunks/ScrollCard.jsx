"use client";

import { useTransform, motion, useScroll } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

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
    color: "rgb(109, 76, 75)",
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
    title: "Bizgrowth Consultancy",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    src: "/projects/Bizgrowth.png",
    link: "/",
    color: "#84cc16",
  },
];

export default function ScrollCardProject() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [bgColor, setBgColor] = useState("black");
  const sectionRef = useRef();

  const handleBgChange = (newColor) => {
    gsap.to(sectionRef.current, {
      backgroundColor: newColor,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section >
      
      <div ref={sectionRef} style={{ backgroundColor: bgColor }}>
        <div ref={container}>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                onVisible={handleBgChange}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
  onVisible,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.4 && v < 0.6) {
        onVisible(color);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, color, onVisible]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: "#FFFFFF",
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-slate-200 relative -top-[25%] h-[450px] w-[70%] rounded-3xl p-10 origin-top"
      >
        <h2 className="text-2xl text-center font-semibold">{title}</h2>
        <div className="flex h-full mt-5 gap-10">
          <div className="w-[40%] relative top-[10%]">
            <p className="text-sm">{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <a href="#" target="_blank" className="underline cursor-pointer">
                Visit
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <div className="relative w-[60%] border h-full rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={src} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
