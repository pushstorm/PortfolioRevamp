"use client";
import {
  motion,
  useMotionValue,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const Scrollbar = () => {
  const constraintsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const y = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setScrollHeight(document.body.scrollHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (progress) => {
      const maxScroll = scrollHeight - viewportHeight;
      const thumbMaxY = viewportHeight - 100; // 100 is thumb height
      y.set(progress * thumbMaxY);
    });
  }, [scrollYProgress, viewportHeight, scrollHeight, y]);

  // Drag to scroll page
  const handleDrag = (_, info) => {
    const thumbMaxY = viewportHeight - 100;
    const scrollMax = scrollHeight - viewportHeight;
    const progress = info.point.y / thumbMaxY;
    window.scrollTo(0, progress * scrollMax);
  };

  return (
    <motion.div
      className="fixed py-[.3rem] top-0 hover:bg-slate-600/10 right-0 w-[20px] h-screen z-[999] block"
      ref={constraintsRef}
    >
      <motion.div
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{ y }}
        className="w-[10px] bg-black rounded-full h-[100px] mx-auto py-2"
      ></motion.div>
    </motion.div>
  );
};

export default Scrollbar;
