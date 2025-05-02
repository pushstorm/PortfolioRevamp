"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links, footerLinks } from "./data";
import { perspective, slideIn } from "./anime";
import { ArrowRight } from "@phosphor-icons/react";
import "./menuCard.css";
import Link from "next/link";
export default function NavCard() {
  const [isHoverd, setIsHoverd] = useState(null);
  return (
    <>
      <div className={`nav z-[1]`}>
        <div className={`body`}>
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <div key={`b_${i}`} className={`.linkContainer `}>
                <motion.div
                  onMouseEnter={() => setIsHoverd(i)}
                  onMouseLeave={() => setIsHoverd(null)}
                  custom={i}
                  variants={perspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <AnimatePresence mode="wait">
                    <Link
                      href={href}
                      className="flex !text-[#e3dde2] items-center gap-2 overflow-hidden"
                    >
                      {isHoverd === i ? (
                        <motion.span
                          initial={{ x: -10, opacity: 0 }}
                          animate={
                            isHoverd === i
                              ? { x: 0, opacity: 1 }
                              : { x: -10, opacity: 0 }
                          }
                          transition={{
                            duration: 0.3,
                            ease: [0.175, 0.885, 0.32, 1.1],
                          }}
                        >
                          <ArrowRight />
                        </motion.span>
                      ) : null}

                      <motion.p
                        initial={{ x: 0 }}
                        animate={isHoverd === i ? { x: 5 } : { x: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.175, 0.885, 0.32, 1.1],
                        }}
                      >
                        {title}
                      </motion.p>
                    </Link>
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
        <motion.div className={`footer`}>
          {footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                key={`f_${i}`}
              >
                {title}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}
