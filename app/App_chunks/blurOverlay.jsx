import React from "react";
import { motion } from "motion/react";
const BlurOverlay = ({ fullScreen = false }) => {
  return (
    <motion.div
      key="blur-overlay"
      initial={{ opacity: 0, backdropFilter: "blur(0)" }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(.3rem)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0)",
      }}
      transition={{
        opacity: { duration: 0.5, ease: [0, 0, 0.2, 1] },
        backdropFilter: {
          duration: 0.5,
          ease: [0, 0, 0.2, 1],
        },
      }}
      className={`${
        fullScreen ? "fixed" : "absolute"
      } rounded-xl w-full h-full top-0 left-0 z-0 bg-white/30`}
    />
  );
};

export default BlurOverlay;
