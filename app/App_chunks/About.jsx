"use client";
import React from "react";
import { motion, useInView } from "motion/react";
const About = () => {
  const para =
    "I am a passionate frontend developer focused on creating seamless digital experiences. With clean code, creative design, and attention to detail, I bring ideas to life. I strive to blend aesthetics with functionality, ensuring every project stands out and delivers an engaging user experience.";
  return (
    <div className="my-32">
      <div className="container max-w-7xl">
        <motion.h2 className="text-4xl font-Cabinet font-[500] text-center">
          {para.split(" ").map((word, idx) => (
            <motion.span key={idx}>{word} </motion.span>
          ))}
        </motion.h2>
      </div>
    </div>
  );
};

export default About;
