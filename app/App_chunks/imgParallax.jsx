"use client";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

import { useTransform, useScroll, motion } from "motion/react";

const images = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/26f30099043947.5ee9fcbdae75c.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/213c8e116650229.6065f83f7f139.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4fe53699075805.5eea7fd3a4828.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/f2c1c6222066283.67df751e8f63b.jpg", // 2e2
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/5c9b26181095369.6517f0f099611.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/32256e168415821.6439cc25e6138.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/4a5829211713677.67b2f962a6894.png",
  "Ui_image_1.png",
  "Ui_image_2.png",
  "Ui_image_3.png",
  "Ui_image_4.png",
];

export default function Home() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.2]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.4]);
  useEffect(() => {
    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: gallery.current?.offsetHeight || window.innerHeight,
      });
    };
  
    const handleResize = () => {
      window.requestAnimationFrame(resize);
    };
  
    window.addEventListener("resize", handleResize);
    resize();
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section >
      <div ref={gallery} data-bg="dark" className={"gallery lg:h-[110vh] xl:h-[175vh] bg-slate-950"}>
        <Column images={[images[0], images[1], images[2], images[6]]} y={y} />
        <Column images={[images[3], images[4], images[5], images[9]]} y={y2} />
        <Column images={[images[6], images[7], images[8], images[0]]} y={y3} />
        <Column images={[images[9], images[10], images[11], images[3]]} y={y4} />
      </div>
       
    </section>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={"column lg:h-[85vh] xl:h-[100%]"} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={"imageContainer lg:h-[450px] xl:h-[550px]"}>
            <img src={src} className="w-full h-full object-cover object-top" alt="image" />
          </div>
        );
      })}
    </motion.div>
  );
};
