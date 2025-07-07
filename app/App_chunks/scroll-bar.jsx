"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, Draggable);

const Scrollbar = () => {
  const circleRef = useRef(null);
  const scrollBarRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current || !scrollBarRef.current) return;

    // Animate circle on scroll
    gsap.to(circleRef.current, {
      y: 250,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Make circle draggable
    Draggable.create(circleRef.current, {
      type: "y",
      bounds: scrollBarRef.current,
      inertia: true,
      onDrag() {
        const scrollBarHeight = 250;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const percent = this.y / scrollBarHeight;
        const to = scrollHeight * percent;
        window.scrollTo({ top: to });
      },
    });

    return () => {
      ScrollTrigger.killAll();
      Draggable.get(circleRef.current)?.kill();
    };
  }, []);

  return (
    <div
      ref={scrollBarRef}
      className="fixed top-0 right-0 w-[20px] h-screen z-[999] pointer-events-none"
    >
      <div
        ref={circleRef}
        className="w-[10px] h-[100px] bg-black rounded-full mx-auto cursor-grab active:cursor-grabbing pointer-events-auto"
      />
    </div>
  );
};

export default Scrollbar;
