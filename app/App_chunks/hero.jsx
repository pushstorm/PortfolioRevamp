"use client";
import React from "react";
import { motion } from "motion/react";
import "./styles.css";
const Hero = () => {
  const heroText = ["Crafting", "aesthetic", "Design"];
  const headAnimation = {
    initial: { scale: 0.6, opacity: 0, x: 700 },
    animate: (index) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.085, // Delay per character
        duration: 1,
        ease: [0.075, 0.82, 0.165, 1],
      },
    }),
  };
  const charAnimation = {
    initial: { scale: 0.6, opacity: 0, x: 100 },
    animate: (custom) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        delay: custom.idx * 0.35 + custom.index * 0.085, // Use the object
        duration: 1,
        ease: [0.075, 0.82, 0.165, 1],
      },
    }),
  };

  return (
    <React.Fragment>
      {/* 64 px  */}
      <div
        className={`w-full relative overflow-hidden lg:h-[38vh] xl:h-[calc(100vh-50px)]`}
        id="heroSectionBG"
      >
        <div className="container  grid grid-rows-3 mt-3 h-full">
          {heroText.map((text, idx) => (
            <motion.h1
              key={idx}
              variants={headAnimation}
              initial="initial"
              animate="animate"
              className={`uppercase perspective font-[700] font-Cabinet text-[13.3vw] lg:text-[16vw] xl:text-[15vw] xxl:text-[13.3vw] leading-[.85] 
                ${idx === 1 ? "mx-auto w-fit" : ""} 
                ${idx === heroText.length - 1 ? "ml-auto text-right" : ""}`}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={charAnimation}
                  custom={{ index, idx }} // Pass an object
                  initial="initial"
                  animate="animate"
                  className="inline-block group text-[#a588a2] relative box "
                >
                  <span className="inline-block invisible  inset-0">
                    {char}
                  </span>
                  <motion.span className="absolute inset-0 top-0 left-0 box__face--front">
                    {char}
                  </motion.span>
                  {/* Bottom Face */}
                  <motion.span className="absolute inset-0 top-0 left-0 box__face--bottom">
                    {char}
                  </motion.span>
                </motion.span>
              ))}
            </motion.h1>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
