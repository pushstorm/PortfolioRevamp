"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";

const Backtotop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="fixed overflow-hidden  z-[999] border border-slate-100/20 origin-center bottom-6 right-6 text-slate-700 bg-purple-100/30 font-[600] backdrop-filter backdrop-blur-xl px-4 py-2 rounded-full shadow-lg transition-opacity duration-300 "
          >

          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Backtotop;
