"use client"; // If using Next.js App Router

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function RotatingHeader({ text = "SPINNING TEXT" }) {
  const containerRef = useRef(null);
  const originalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const original = originalRef.current;

    if (!container || !original) return;

    // Clone h1
    const clone = original.cloneNode(true);
    container.appendChild(clone);

    // Move clone up
    gsap.set(clone, { yPercent: -60 });

    // Split both
    const originalSplit = new SplitText(original, { type: "chars" });
    const cloneSplit = new SplitText(clone, { type: "chars" });

    // Initial clone chars
    gsap.set(cloneSplit.chars, {
      rotationX: -90,
      opacity: 0,
      transformOrigin: "50% 50% -50px",
    });

    // Animate
    const tl = gsap.timeline();

    tl.to(originalSplit.chars, {
      duration: 0.4,
      rotationX: 90,
      transformOrigin: "50% 50% -50px",
      stagger: { each: 0.02, from: "start" },
      ease: "power2.out",
    });

    tl.to(
      originalSplit.chars,
      {
        duration: 0.4,
        opacity: 0,
        stagger: { each: 0.02, from: "start" },
        ease: "power4.in",
      },
      0
    );

    tl.to(
      cloneSplit.chars,
      {
        duration: 0.05,
        opacity: 1,
        stagger: { each: 0.02, from: "start" },
      },
      0.001
    );

    tl.to(
      cloneSplit.chars,
      {
        duration: 0.4,
        rotationX: 0,
        stagger: { each: 0.02, from: "start" },
      },
      0
    );

    return () => {
      clone.remove();
      originalSplit.revert();
      cloneSplit.revert();
    };
  }, [text]);

  return (
    <div className="rotatingHeader" ref={containerRef}>
      <h1
        ref={originalRef}
        className="text-3xl font-[500] text-slate-200 m-0 p-0 leading-[0.5] font-saira"
      >
        {text}
      </h1>
    </div>
  );
}
