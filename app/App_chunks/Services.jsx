"use client";
import { useRef, useEffect, useState, use } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../globals.css";
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const services = [
    "App Router",
    "Image Optimization (Next/Image)",
    "API Routes & Serverless Functions",
    "Middleware & Edge Functions",
    "Dynamic Imports",
    "Seach Engine Optimization",
    "Next Cache",
    "space",
    "Concurrent Rendering",
    "Server Components",
    "React Hooks & State Management",
    "Component Reusability",
    "Performance Optimization",
    "Data Fetching & Mutations",
    "Tailwind Css V4",
    "space",
    "Auto Layout & Responsive Design",
    "Component Variants & Design Systems",
    "Interactive Prototyping & Smart Animate",
    "Collaboration & Real-Time Editing",
    "Figma Plugins & API Integrations",
  ];
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const titles = ["Next.js", "React.js", "Figma"];
  const titleContainerRef = useRef(null);
  const servicesRef = useRef(null);
  const dotRefs = useRef([]);
  useEffect(() => {
    const sections = gsap.utils.toArray(".service-text");
    let accumulatedProgress = 0;
    let lastProgressMap = new Map(); // Track progress for each "space" separately

    sections.forEach((el, idx) => {
      gsap.fromTo(
        el,
        { x: `150%` },
        {
          x: "0%",
          scrollTrigger: {
            trigger: el,
            start: "top 120%",
            end: "top 60%",
            scrub: 1.7,
            ease: "expo.out",
          },
        }
      );

      if (services[idx] === "space") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 10%",
          end: "top 20%",
          scrub: 1.4,
          onUpdate: (self) => {
            const currentProgress = self.progress;
            const lastProgress = lastProgressMap.get(el) || 0;

            if (currentProgress > lastProgress) {
              accumulatedProgress -= 33.33;
            } else if (currentProgress < lastProgress) {
              accumulatedProgress += 33.33;
            }
            const currentIndex = Math.round(
              Math.abs(accumulatedProgress / 33.33)
            );
            dotRefs.current.forEach((dot, i) => {
              if (!dot) return;

              if (i <= currentIndex) {
                // All previous & current stay colored
                dot.style.backgroundColor = "black";
                dot.style.color = "white";
              } else {
                // Future dots are uncolored
                dot.style.backgroundColor = "white";
                dot.style.color = "black";
              }
            });

            lastProgressMap.set(el, currentProgress);
            gsap.to(titleContainerRef.current, {
              y: `${accumulatedProgress}%`, // Moves title gradually
              opacity: 1,
              ease: "circ.inout",
            });
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (titleContainerRef.current) {
      gsap.to(lineRef.current, {
        value: 100,
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          scrub: 0.2,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="">
      <div className="grid py-32 grid-cols-2 gap-32  container relative">
        <div className="w-[1px] bg-black h-full absolute top-0 left-1/2 -translate-x-1/2" />
        {/* Left Text Section */}
        <div className="sticky pt-14 pb-24 h-fit top-0 left-0">
          <h3 className="text-3xl font-Satoshi ">Technology Stack</h3>
          <div className="relative overflow-hidden mt-3 h-[72px]">
            <div ref={titleContainerRef} className=" absolute top-0 left-0">
              {titles.map((title, idx) => {
                return (
                  <h1 className=" text-6xl py-1 font-WorkSans" key={idx}>
                    {title}
                  </h1>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between w-48 mt-3 relative">
            <progress
              ref={lineRef}
              max={"100"}
              value={"0"}
              className="w-full  w3-red h-[1px] origin-left absolute top-1/2 -translate-y-1/2  left-0 "
            />
            {titles.map((_, idx) => (
              <div
                ref={(el) => (dotRefs.current[idx] = el)}
                key={idx}
                className={`  flex justify-center  relative z-10 font-[600] font-Cabinet items-center w-7 ${idx == 0 ? 'bg-black text-white' : 'bg-white text-black'} h-7 rounded-full`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <p className="mt-2">
            I turn ideas into fast, scalable, and beautifully crafted digital
            experiences. Whether it's building high-performance web apps,
            optimizing for SEO, designing responsive layouts, or shaping
            seamless user journeys, I make sure every project connects with real
            users and real goals.
            <br /> With hands-on expertise in React, Next.js, Server Components,
            API integrations, and modern design tools like Figma, I bring both
            technical precision and creative thinking to the table. And if a
            project needs skills beyond my stack, I can connect with the right
            experts to move things forward — no bottlenecks, just progress.
          </p>
        </div>

        {/* Right Animated List */}
        <div ref={servicesRef} className=" py-14 overflow-hidden">
          {services.map((service, idx) =>
            service === "space" ? (
              <div key={idx} className="my-10 service-text w-full h-1 relative">
                <span className="absolute top-0 left-0 bg-black/30 w-[50vw] h-[1px]"></span>
              </div>
            ) : (
              <h2
                key={idx}
                className="service-text text-3xl font-[600] font-Cabinet mt-9"
              >
                {service}
              </h2>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
