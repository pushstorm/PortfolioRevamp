"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";
import { ArrowUpRight } from "@phosphor-icons/react";

import Button from "../Menu/MenuButton";
import NavCard from "../Menu/NavCard";

const Header = forwardRef((props, ref) => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const menu = {
    open: {
      width: "480px",
      height: "650px",
      top: "-10px",
      right: "-10px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: "100px",
      height: "40px",
      top: "0px",
      right: "0px",
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const [showOverlay, setShowOverlay] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setShowOverlay(true); // Show overlay when active
    } else {
      // Delay unmounting to allow exit animation to play
      setTimeout(() => setShowOverlay(false), 800); // Match the exit duration
    }
  }, [isActive]);
  return (
    <>
      <div className="flex w-full  navBar justify-center py-4" ref={ref}>
        <motion.div className=" flex justify-between container  items-center specialContainer relative z-[12]  md:bg-transparent md:static  ">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              // Unmount only after the exit animation completes
              if (!isActive) setShowOverlay(false);
            }}
          >
            {showOverlay && (
              <motion.div
                key="blur-overlay"
                initial={{ opacity: 0, backdropFilter: "blur(0)" }}
                animate={{ opacity: 1, backdropFilter: "blur(1.3rem)" }}
                exit={{
                  opacity: 0,
                  backdropFilter: "blur(0)",
                }}
                transition={{
                  opacity: { duration: 0.5, ease: [0, 0, 0.2, 1] },
                  backdropFilter: { duration: 0.5, ease: [0, 0, 0.2, 1] },
                }}
                className="fixed w-screen h-screen top-0 left-0 z-0 bg-white/30"
              />
            )}
          </AnimatePresence>

          <div
            className={`text-3xl font-pacifico font-[500] xl:text-4xl ${
              isActive ? "relative -z-10" : ""
            } -z-10 text-slate-900 `}
          >
            <motion.h2
              animate={{ rotateX: [-100, 0], y: [-50, 0], x: [-30, 0] }}
              transition={{
                duration: 1.3,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.7,
              }}
            >
              *Faheem
            </motion.h2>
          </div>

          <div className="flex items-center gap-1 md:gap-5 heroBox">
            <motion.a className='text-slate-900 flex text-[.9em] md:text-[1.25em] relative  after:content-[""] after:w-0 after:h-[1px] cursor-pointer after:bg-slate-900 after:absolute after:bottom-0 after:left-0  hover:after:w-full after:transition-all after:duration-300'>
              Projects <ArrowUpRight />
            </motion.a>
            <a
              href={"https://www.behance.net/faheemkhan72"}
              className='text-slate-900 flex text-[.9em] md:text-[1.25em] relative  after:content-[""] after:w-0 after:h-[1px] cursor-pointer after:bg-slate-900 after:absolute after:bottom-0 after:left-0  hover:after:w-full after:transition-all after:duration-300'
            >
              Behance <ArrowUpRight />
            </a>
            <div className="w-32" />

            <div className={`absolute right-8 -top-1`} ref={menuRef}>
              <motion.div
                className={`w-[480px] bg-[#291f28] text-[#e3dde2] rounded-[25px] relative`}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
              >
                <AnimatePresence>{isActive && <NavCard />}</AnimatePresence>
              </motion.div>
              <div ref={buttonRef}>
                <Button
                  isActive={isActive}
                  toggleMenu={() => {
                    setIsActive(!isActive);
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
});

export default Header;
