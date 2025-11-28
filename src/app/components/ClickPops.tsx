"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Pop = {
  id: number;
  x: number;
  y: number;
  img: string;
};

const assets = [
  "/WEB_ELEMENT/CLICK CHUOT/Asset 40.png",
  "/WEB_ELEMENT/CLICK CHUOT/Asset 41.png",
  "/WEB_ELEMENT/CLICK CHUOT/Asset 42.png",
  "/WEB_ELEMENT/CLICK CHUOT/Asset 43.png",
];

export default function ClickPops() {
  const [pops, setPops] = useState<Pop[]>([]);
  const idxRef = useRef(0);

  useEffect(() => {
    // Preload assets to prevent first-click delay
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const onPointerDown = (e: PointerEvent) => {
      // If clicking on a draggable or interactive input, we still show the effect.
      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.floor(Math.random() * 10000);
      const img = assets[idxRef.current % assets.length];
      idxRef.current = (idxRef.current + 1) % assets.length;

      setPops((prev) => [...prev, { id, x, y, img }].slice(-12));

      // Clean up this pop after animation duration
      setTimeout(() => {
        setPops((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {pops.map((pop) => (
          <motion.img
            key={pop.id}
            src={pop.img}
            alt="click pop"
            style={{ left: pop.x, top: pop.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.5, 1] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 select-none"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
