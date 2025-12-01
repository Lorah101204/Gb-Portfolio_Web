"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioDropdown from "@/app/components/PortfolioDropdown"; // chỉnh path nếu khác

const TOTAL_SLIDES = 3;

export default function GameEchoesOfTimePage() {
  const [pageIndex, setPageIndex] = useState(0); // 0..3
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  // trạng thái slide 0: ảnh project name đã phóng to chưa
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);

  // Lăn chuột để chuyển slide 0 <-> 3
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (pageIndex === 0 && !isProjectExpanded) return;

      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // ưu tiên lăn dọc

      e.preventDefault();

      if (e.deltaY > 0 && pageIndex < TOTAL_SLIDES - 1) {
        // lăn xuống → slide tiếp theo
        isAnimatingRef.current = true;
        setPageIndex((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 650);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        // lăn lên → slide trước
        isAnimatingRef.current = true;
        setPageIndex((prev) => Math.max(prev - 1, 0));
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 650);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel as any);
    };
  }, [pageIndex, isProjectExpanded]);

  const handleProjectClick = () => {
    setIsProjectExpanded((prev) => {
      const next = !prev;

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio-bars-toggle", {
            detail: { hidden: next }, // phóng to => true, thu nhỏ => false
          })
        );
      }

      return next;
    });
  };



  // 🟡 config thanh indicator bên dưới
  const DOT_WIDTH = 96;   // width icon asset64
  const GAP = 0;          // khoảng cách giữa 2 icon
  const SEGMENT = DOT_WIDTH + GAP; // mỗi step
  const TRACK_WIDTH = DOT_WIDTH * TOTAL_SLIDES + GAP * (TOTAL_SLIDES - 1); // tổng chiều dài
  const knobLeft = pageIndex * SEGMENT; // px từ trái

  return (
    <section
      ref={containerRef}
      className="h-screen w-screen relative overflow-hidden"
    >
      {/* SLIDER: 4 slide, trượt theo pageIndex */}
      <motion.div
        className="absolute inset-0 flex"
        animate={{ x: `-${pageIndex * 100}%` }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Slide 0: BG + project name zoom */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          {/* BG slide 0 */}
          <Image
            src="/WEB_ELEMENT/portfolio/Thumbnails/BACKGROUND/Asset40.png"
            alt="Ga va Ho background"
            fill
            priority
            className="object-cover"
          />

          {/* Project name ở giữa, scale 50% -> 100% khi click */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                onClick={handleProjectClick}
                initial={false}
                animate={{ scale: isProjectExpanded ? 1 : 0.5 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-pointer"
              >
              <Image
                src="/WEB_ELEMENT/portfolio/Thumbnails/PROJECT NAMES/Asset53.png"
                alt="Project Name"
                width={1023}
                height={897}
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Slide 1 */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          <Image
            src="/WEB_ELEMENT/portfolio/Thumbnails/2x/Echoes of time game/Asset 12.png"
            alt="Echoes of Time 1"
            fill
            className="object-cover"
          />
        </div>

        {/* Slide 3 */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          <Image
            src="/WEB_ELEMENT/portfolio/Thumbnails/2x/Echoes of time game/Asset 13 (1).png"
            alt="Echoes of Time 3"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* 🟣 THANH SLIDE DƯỚI TRANG */}
      <div
        className="
          absolute left-1/2
          top-[89.5%] 
          -translate-x-1/2
          z-20
        "
      >
        <div
          className="relative flex items-center"
          style={{ width: TRACK_WIDTH, height: 60 }}
        >
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div
              key={i}
              style={{ width: DOT_WIDTH, marginRight: i === TOTAL_SLIDES - 1 ? 0 : GAP }}
            >
              <Image
                src="/WEB_ELEMENT/portfolio/Thumbnails/Asset64.png"
                alt={`Slide indicator ${i + 1}`}
                width={DOT_WIDTH}
                height={DOT_WIDTH}
                className="object-contain"
              />
            </div>
          ))}

          {/* Nút asset63 trượt theo slide */}
          <motion.div
            className="absolute"
            initial={false}
            animate={{ left: knobLeft }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src="/WEB_ELEMENT/portfolio/Thumbnails/Asset63.png"
              alt="Current slide indicator"
              width={96}
              height={48}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Phần header trong file này hiện vẫn giữ nguyên.
          Nếu sau này bạn dùng Navbar/Footer từ layout, 
          chỉ cần xoá block header này đi. */}
      <div className="relative z-30 h-full w-full flex flex-col pointer-events-none">
        <header
          className="
            w-full
            px-8 pt-6 pb-20
            flex justify-between items-start
            pointer-events-auto
          "
        >
          <div className="flex items-start">
            <Image
              src="/WEB_ELEMENT/portfolio/Thumbnails/LOGO UPPER LEFT CORNER/Asset43.png"
              alt="Art Portfolio Logo"
              width={70}
              height={101}
              className="object-contain mt-1"
            />
          </div>

          <div className="flex gap-10 items-start mt-4">
            <Link href="/" className="nav-link" style={{ color: "#F6B8D3" }}>
              Home
            </Link>

            <Link href="/about-me" className="nav-link" style={{ color: "#F6B8D3" }}>
              About
            </Link>

            <PortfolioDropdown
              triggerColor="#F6B8D3"
              dropdownBgSrc="/WEB_ELEMENT/portfolio/Thumbnails/Asset56.png"
              itemColor="#F3762B"
            />

            <Link href="/contact" className="nav-link" style={{ color: "#F6B8D3" }}>
              Contact
            </Link>
          </div>
        </header>

        <div className="flex-1" />
      </div>
    </section>
  );
}
