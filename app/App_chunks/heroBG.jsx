"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLoading } from "../Context/LoadingContext";
import { motion, animate } from "motion/react";
const HeroBG = () => {
  const [navHeight, setNavHeight] = useState(0);
  const { isLoading } = useLoading();
  const pathRef = useRef(null);

  useEffect(() => {
    const getHeight = () => {
      const navElement = document.querySelector("#heroSectionBG");
      if (navElement) {
        const height = navElement.offsetHeight;
        setNavHeight(height);
      }
    };
    window.addEventListener("resize", getHeight); // run on resize
    getHeight(); // run on mount
    return () => window.removeEventListener("resize", getHeight);
  }, [isLoading]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const controls = animate(0, 1, {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, []);

  return (
    <div className="absolute left-0 -z-10 flex justify-between items-center w-full  overflow-hidden" style={{ top: 47 }}>
      {" "}
      <div className="relative w-full">
        <div className={``}>
          <svg
            width="760"
            height={navHeight}
            viewBox={`0 0 760 ${navHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M760 967.752C760 568.981 623.094 172.729 0 0.751953V967.752H760Z"
              fill="url(#paint0_linear_1694_98)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1694_98"
                x1="447.969"
                y1="372.867"
                x2="-404.008"
                y2="1416.44"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FAF5FF" />
                <stop offset="1" stopColor="#B99BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={`absolute inset-0`}>
          <svg
            width="761"
            height={navHeight}
            viewBox={`0 0 761 ${navHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="glow-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#9d57ff" stopOpacity="0" />
                <stop offset="20%" stopColor="#9d57ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#9d57ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Static base path */}
            <path
              d="M0.5 0.751953C210.914 62.5719 768.633 219.886 760.41 966.752"
              stroke="#CFBDFE"
              strokeWidth="0.4"
            />

            {/* Glowing animated path */}
            <motion.path
              d="M0.5 0.751953C210.914 62.5719 768.633 219.886 760.41 966.752"
              stroke="url(#glow-gradient)"
              strokeWidth=".5"
              strokeLinecap="round"
              style={{
                filter: "blur(0px)",
              }}
              // Keyframe-based animation to avoid reverse
              initial={{ pathLength: 0.2, pathOffset: 0 }}
              animate={{
                pathLength: 0.2,
                pathOffset: [-0.5, 1],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                easings: [0.6, 0.04, 0.98, 0.335],
              }}
            />
          </svg>
        </div>
      </div>
      <div className="relative  w-full -scale-x-100 ">
        <div className={``}>
          <svg
            width="760"
            height={navHeight}
            viewBox={`0 0 760 ${navHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M760 967.752C760 568.981 623.094 172.729 0 0.751953V967.752H760Z"
              fill="url(#paint0_linear_1694_98)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1694_98"
                x1="447.969"
                y1="372.867"
                x2="-404.008"
                y2="1416.44"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FAF5FF" />
                <stop offset="1" stopColor="#B99BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={`absolute inset-0`}>
          <svg
            width="761"
            height={navHeight}
            viewBox={`0 0 761 ${navHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="glow-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#9d57ff" stopOpacity="0" />
                <stop offset="20%" stopColor="#9d57ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#9d57ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Static base path */}
            <path
              d="M0.5 0.751953C210.914 62.5719 768.633 219.886 760.41 966.752"
              stroke="#CFBDFE"
              strokeWidth="0.4"
            />

            {/* Glowing animated path */}
            <motion.path
              d="M0.5 0.751953C210.914 62.5719 768.633 219.886 760.41 966.752"
              stroke="url(#glow-gradient)"
              strokeWidth=".5"
              strokeLinecap="round"
              style={{
                filter: "blur(0px)",
              }}
              // Keyframe-based animation to avoid reverse
              initial={{ pathLength: 0.2, pathOffset: 0 }}
              animate={{
                pathLength: 0.2,
                pathOffset: [-0.5, 1],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                easings: [0.6, 0.04, 0.98, 0.335],
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBG;
