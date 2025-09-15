"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const Scrollbar = () => {
  const circleRef = useRef(null);
  const scrollbarRef = useRef(null);    
  
  const draggableRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [isDarkBg, setIsDarkBg] = useState(false);
    useEffect(() => {
    const sections = document.querySelectorAll("[data-bg]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isDark = entry.target.dataset.bg === "dark";
            setIsDarkBg(isDark);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const circle = circleRef.current;
    const scrollbar = scrollbarRef.current;

    if (!circle || !scrollbar) return;

    const update = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollbarHeight = scrollbar.offsetHeight - circle.offsetHeight;

      // Clean up
      scrollTriggerRef.current?.kill();
      draggableRef.current?.kill();

      // Sync circle with scroll
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(circle, { y: scrollbarHeight * self.progress });
        },
      });

      // Drag control
      draggableRef.current = Draggable.create(circle, {
        type: "y",
        bounds: scrollbar,
        inertia: true,
        onDrag() {
          const percent = this.y / scrollbarHeight;
          const scrollTo = percent * scrollHeight;
          window.scrollTo({ top: scrollTo });
        },
      })[0];

      ScrollTrigger.refresh();
    };

    // Wait for content to load before measuring
    const handleReady = () => {
      setTimeout(update, 100); // Give layout time
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    window.addEventListener("resize", update);

    return () => {
      scrollTriggerRef.current?.kill();
      draggableRef.current?.kill();
      window.removeEventListener("resize", update);
      window.removeEventListener("load", handleReady);
    };
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let timeout;

    const handleScroll = () => {
      gsap.to(circle, { opacity: 1, duration: 0.2 });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        gsap.to(circle, { opacity: 0, duration: 0.5 });
      }, 1000); // Fade out after 1.5s of inactivity
    };

    window.addEventListener("scroll", handleScroll);

    // Start hidden
    gsap.set(circle, { opacity: 0 });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={scrollbarRef}
      className="fixed top-0 right-0 w-[20px] py-1 group h-screen z-[999] bg-transparent"
    >
      <div
        ref={circleRef}
        className="w-[10px] h-[100px] bg-black opacity-0  rounded-full mx-auto cursor-grab active:cursor-grabbing mix-blend-difference"
      />
    </div>
  );
};

export default Scrollbar;
