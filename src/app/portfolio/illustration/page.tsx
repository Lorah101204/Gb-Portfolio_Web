"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioDropdown from "@/app/components/PortfolioDropdown"; // chỉnh path nếu khác

const TOTAL_SLIDES = 2;

type SlideImageConfig = {
  src: string;
  alt: string;
  positionClass: string;
  thumbScale?: number;   // scale khi nằm trên slide
  overlayScale?: number; // scale khi phóng to
};

// 🟡 Config 4 ảnh ở slide 2
const SLIDE2_IMAGES: SlideImageConfig[] = [
  {
    src: "/WEB_ELEMENT/portfolio/Thumbnails/2x/Ilustration/15th.jpg",
    alt: "Illustration 1",
    positionClass:
      "top-[5%] left-[5%] md:top-[-5%] md:left-[15%] rotate-[-6deg]",
    thumbScale: 0.9,
    overlayScale: 0.5,
  },
  {
    src: "/WEB_ELEMENT/portfolio/Thumbnails/2x/Ilustration/121st.png",
    alt: "Illustration 2",
    positionClass:
      "bottom-[0%] left-[18%] md:bottom-[-8%] md:left-[15%] rotate-[4deg]",
    thumbScale: 1.0,
    overlayScale: 0.95,
  },
  {
    src: "/WEB_ELEMENT/portfolio/Thumbnails/2x/Ilustration/ATNAIFINAL.png.jpg",
    alt: "Illustration 3",
    positionClass:
      "top-[0%] right-[10%] md:top-[20%] md:right-[20%] rotate-[7deg]",
    thumbScale: 2,
    overlayScale: 1.65,
  },
  {
    src: "/WEB_ELEMENT/portfolio/Thumbnails/2x/Ilustration/Complex01-2.jpg",
    alt: "Illustration 4",
    positionClass:
      "bottom-[5%] right-[0%] md:bottom-[-0%] md:right-[20%] rotate-[-3deg]",
    thumbScale: 2,
    overlayScale: 1.65,
  },
];

export default function IllustrationPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  // trạng thái slide 0: ảnh project name đã phóng to chưa
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);

  // 🟣 index ảnh đang phóng to ở slide 2 (null = không mở overlay)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage =
    activeIndex !== null ? SLIDE2_IMAGES[activeIndex] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProjectExpanded(true);

      // bắn event giống như khi bấm click phóng to
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("portfolio-bars-toggle", {
            detail: { hidden: true }, // phóng to => true
          })
        );
      }
    }, 50); // 0.2s

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Lăn chuột để chuyển slide 0 <-> 1
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // 🔒 Nếu đang mở overlay → chặn scroll luôn
      if (activeIndex !== null) return;

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
  }, [pageIndex, isProjectExpanded, activeIndex]);

  // 🔒 Khi mở overlay → khoá scroll body
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;

    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [activeIndex]);

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
  const DOT_WIDTH = 96;
  const GAP = 0;
  const SEGMENT = DOT_WIDTH + GAP;
  const TRACK_WIDTH =
    DOT_WIDTH * TOTAL_SLIDES + GAP * (TOTAL_SLIDES - 1);
  const knobLeft = pageIndex * SEGMENT;

  return (
    <section
      ref={containerRef}
      className="h-screen w-screen relative overflow-hidden"
    >
      {/* SLIDER: trượt theo pageIndex */}
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
          <Image
            src="/WEB_ELEMENT/portfolio/Thumbnails/BACKGROUND/Asset40.png"
            alt="background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              onClick={handleProjectClick}
              initial={false}
              animate={{ scale: isProjectExpanded ? 1.25 : 0.5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="cursor-pointer"
            >
              <Image
                src="/WEB_ELEMENT/NEWDESIGN/newasset/Asset 87.png"
                alt="Project Name"
                width={1023}
                height={897}
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* 🟣 Slide 1: BG + 4 ảnh lộn xộn chồng chéo */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          <Image
            src="/WEB_ELEMENT/portfolio/Thumbnails/BACKGROUND/Asset40.png"
            alt="background slide 2"
            fill
            className="object-cover"
          />

            <div className="absolute inset-0 flex items-center justify-center translate-y-[-50px]">
            <div className="relative w-[90vw] max-w-5xl h-[60vh] max-h-[600px]">
              {SLIDE2_IMAGES.map((img, index) => {
                const baseScale = img.thumbScale ?? 1;

                return (
                  <motion.button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`absolute cursor-pointer ${img.positionClass}`}
                    style={{
                      width: "38vw",
                      maxWidth: "260px",
                      minWidth: "180px",
                    }}
                    initial={{ scale: baseScale }}
                    whileHover={{
                      scale: baseScale * 1.05,
                      zIndex: 20,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Container không ép aspect ratio, ảnh giữ tỉ lệ */}
                    <div className="relative w-full shadow-xl shadow-black/30 rounded-2xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-sm">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={800}   // placeholder tỉ lệ
                        height={1000}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🟣 Overlay phóng to ảnh khi click */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative w-[88vw] max-w-4xl"
              initial={{
                scale: (activeImage.overlayScale ?? 1) * 0.9,
                opacity: 0,
              }}
              animate={{
                scale: activeImage.overlayScale ?? 1,
                opacity: 1,
              }}
              exit={{
                scale: (activeImage.overlayScale ?? 1) * 0.95,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[2000vh] rounded-3xl overflow-hidden bg-black">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={1900}
                  height={1000}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              style={{
                width: DOT_WIDTH,
                marginRight: i === TOTAL_SLIDES - 1 ? 0 : GAP,
              }}
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

      {/* Header & Layout overlay */}
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
