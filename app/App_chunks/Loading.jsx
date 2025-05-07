"use client";
//Loading component completed
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const Loading = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let delay = 80; // Start slow

    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }

        const newProgress = prev + 1;

        // Slow start until 40%, then speed up
        if (newProgress < 40) {
          delay = Math.min(100, delay * 10); // Gradually increase delay
        } else {
          delay = Math.max(5, delay * 1.1); // Gradually decrease delay
        }

        setTimeout(updateProgress, delay); // Schedule next update
        return newProgress;
      });
    };

    setTimeout(updateProgress, delay); // Start animation

    return () => clearTimeout(updateProgress);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setIsLoading(false), 1300); // Small delay for exit animation
    }
  }, [progress]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen grid grid-cols-2 z-[9999999]"
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Progress Bar */}
      {progress < 100 && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[2px] bg-white"
          initial={{ height: "0%" }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full text-white text-4xl font-bold">
            {progress}%
          </div>
        </motion.div>
      )}

      {/* Left Panel */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: progress == 100 ? 0 : 1 }}
        transition={{ duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
        className="h-full w-full bg-black origin-left"
      />

      {/* Right Panel */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: progress == 100 ? 0 : 1 }}
        transition={{ duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
        className="h-full w-full bg-black origin-right"
      />
    </motion.div>
  );
};

export default Loading;
