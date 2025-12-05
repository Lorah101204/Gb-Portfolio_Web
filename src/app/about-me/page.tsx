"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioDropdown from "../components/PortfolioDropdown";

export default function AboutPage() {
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const isAnimatingRef = useRef(false);
  const wheelBlockRef = useRef(false);

  // =====================
  // SCROLL LOGIC
  // =====================
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelBlockRef.current) return;

      // Wheel down → next slide
      if (e.deltaY > 0 && pageIndex === 0) {
        changePage(1);
      }

      // Wheel up → previous slide
      if (e.deltaY < 0 && pageIndex === 1) {
        changePage(0);
      }

      // prevent spam scroll
      wheelBlockRef.current = true;
      setTimeout(() => {
        wheelBlockRef.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [pageIndex]);

  // =====================
  // SLIDE SWITCH
  // =====================
  const changePage = (index: 0 | 1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setPageIndex(index);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  };

  return (
    <section className="h-screen w-screen relative overflow-hidden">

      {/* FIXED BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/WEB_ELEMENT/NEWDESIGN/aboutme/LEL1.png"
          alt="About Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* FIXED HEADER */}
      <div className="relative z-20 w-full flex flex-col pointer-events-none">
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
              src="/WEB_ELEMENT/1x/Asset27.png"
              alt="Art Portfolio Logo"
              width={70}
              height={101}
              className="object-contain mt-1"
            />
          </div>

          <div className="flex gap-10 items-start mt-4">
            <Link href="/" className="nav-link" style={{ color: "#F3762B" }}>
              Home
            </Link>

            <Link href="/about-me" className="nav-link" style={{ color: "#F3762B" }}>
              About
            </Link>

            <PortfolioDropdown
              dropdownBgSrc="/WEB_ELEMENT/portfolio/Thumbnails/Asset56.png"ko
            />

            <Link
              href="/contact"
              className="nav-link"
              style={{ color: "#F3762B" }}
            >
              Contact
            </Link>
          </div>
        </header>
      </div>

      {/* SLIDING CONTENT */}
      <motion.div
        className="absolute inset-0 flex z-10"
        animate={{ x: pageIndex === 0 ? "0%" : "-100%" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        {/* ============= PAGE 1 ============= */}
        <div
          className="
            h-full w-full shrink-0 
            flex flex-col items-end justify-center ml-[-240px] mt-30
          "
        >
          <Image
            src="/WEB_ELEMENT/NEWDESIGN/aboutme/text.png"
            alt="About Image 1"
            width={788}
            height={223}
            className="rounded-xl"
          />
        </div>

        {/* ============= PAGE 2 ============= */}
        <div
          className="
            h-full w-full shrink-0 
            flex flex-col items-end justify-center mr-[300px] mt-30
          "
        >
          <Image
            src="/WEB_ELEMENT/NEWDESIGN/aboutme/TEXT2.png"
            alt="About Image 2"
            width={857}
            height={570}
            className="rounded-xl"
          />
        </div>

      </motion.div>
    </section>
  );
}
