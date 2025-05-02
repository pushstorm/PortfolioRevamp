'use client'
import { VelocityScroll } from "../../components/magicui/scroll-based-velocity";
import { StarFour } from "@phosphor-icons/react";
import { motion } from "framer-motion";
export function Marquee() {
  const TechStack = ["Next", "Lenis", "Tailwlind", "Motion", "React"];
  return (
    <motion.div
      initial={{ y: 300, scale: 0.6 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] }}
      className="relative mt-20 origin-left py-5 bg-[#e3dde2] flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <VelocityScroll defaultVelocity={3} numRows={1}>
        {TechStack.map((item, idx) => (
          <span
            key={idx}
            className="inline-block text-[#544052] gap-1 font-[600] font-Cabinet md:text-5xl"
          >
            <StarFour className="inline-block mr-7 ml-9 text-4xl" weight="fill"  />{" "}
            {item}
          </span>
        ))}
      </VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FAF5FF] from-[5%]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#FAF5FF] from-[5%]"></div>
    </motion.div>
  ) 
}
