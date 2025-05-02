"use client";
import { useRef, useEffect, useState } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const containerRef = useRef(null);
  const titles = ["Next.js", "React.js", "Figma"];
  const titleContainerRef = useRef(null);
  useEffect(() => {
    const sections = gsap.utils.toArray(".service-text");
    let accumulatedProgress = 0; // Track total movement
    let lastProgressMap = new Map(); // Track progress for each "space" separately

    sections.forEach((el, idx) => {
      gsap.fromTo(
        el,
        { x: "120%" },
        {
          x: "0%",
          scrollTrigger: {
            trigger: el,
            start: "top 120%",
            end: "top 60%",
            scrub: 1.5,
            ease: "circ.inout",
          },
        }
      );

      if (services[idx] === "space") {
        ScrollTrigger.create({
          trigger: el,
          start: "top 10%",
          end: "top 20%",
          scrub: 1.2,
          onUpdate: (self) => {
            const currentProgress = self.progress;
            const lastProgress = lastProgressMap.get(el) || 0;

            if (currentProgress > lastProgress) {
              // Scrolling DOWN: Add 33.33%
              accumulatedProgress -= 33.33;
            } else if (currentProgress < lastProgress) {
              // Scrolling UP: Subtract 33.33%
              accumulatedProgress += 33.33;
            }

            lastProgressMap.set(el, currentProgress); // Update individual section progress

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

  return (
    <div ref={containerRef} className="">
      <div className="grid py-32 overflow-hidden  grid-cols-2 gap-32  container relative">
        <div className="w-[1px] bg-black h-full absolute top-0 left-1/2 -translate-x-1/2" />
        {/* Left Text Section */}
        <div className="sticky pt-14 pb-24 h-fit top-0 left-0">
          <h3 className="text-3xl font-Satoshi">Technology Stack</h3>
          <div className="relative overflow-hidden mt-3">
            <h1 className=" text-6xl invisible py-1 font-WorkSans">
              Invisible Text
            </h1>

            <div ref={titleContainerRef} className="absolute top-0 left-0">
              {titles.map((title, idx) => {
                return (
                  <h1 className=" text-6xl py-1 font-WorkSans" key={idx}>
                    {title}
                  </h1>
                );
              })}
            </div>
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
        <div className=" py-14">
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
