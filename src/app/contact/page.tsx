"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioDropdown from "../components/PortfolioDropdown";

export default function ContactPage() {
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);

  // Lăn chuột để chuyển slide 0 <-> 1
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // ưu tiên lăn dọc

      e.preventDefault();

      if (e.deltaY > 0 && pageIndex === 0) {
        // lăn xuống: slide 1 -> slide 2
        isAnimatingRef.current = true;
        setPageIndex(1);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 650);
      } else if (e.deltaY < 0 && pageIndex === 1) {
        // lăn lên: slide 2 -> slide 1
        isAnimatingRef.current = true;
        setPageIndex(0);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 650);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel as any);
    };
  }, [pageIndex]);

  return (
    <section
      ref={containerRef}
      className="h-screen w-screen relative overflow-hidden"
    >
      {/* BACKGROUND SLIDER + CONTENT SLIDE 2 */}
      <motion.div
        className="absolute inset-0 flex"
        animate={{ x: pageIndex === 0 ? "0%" : "-100%" }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Slide 1: asset34, không content giữa */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          <Image
            src="/WEB_ELEMENT/1x/Asset39.png"
            alt="Contact background 1"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Slide 2: asset35 + CONTENT LIỀN SLIDE */}
        <div className="relative h-full w-full shrink-0 overflow-hidden">
          <Image
            src="/WEB_ELEMENT/1x/Asset35.png"
            alt="Contact background 2"
            fill
            className="object-cover"
          />

          {/* Content slide 2 – trượt cùng slide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="max-w-xl w-full"
              style={{
                // offset vị trí content (chỉnh tuỳ ý)
                transform: "translate(-190px, 175px)",
              }}
            >
              <div className="space-y-[50px]">
                {/* Dòng 1 */}
                <div className="flex items-center gap-12">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset30.png"
                    alt="Contact icon 1"
                    width={58}
                    height={58}
                    className="object-contain"
                  />
                  <Link
                    href="mailto:baong031103@gmail.com"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: '"FivoSansHeavy", sans-serif',
                    }}
                    className="nav-link-heavy"
                  >
                    baong031103@gmail.com
                  </Link>
                </div>

                {/* Dòng 2 */}
                <div className="flex items-center gap-12">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset31.png"
                    alt="Contact icon 2"
                    width={58}
                    height={58}
                    className="object-contain"
                  />
                  <Link
                    href="https://www.behance.net/giabonguyn11"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: '"FivoSansHeavy", sans-serif',
                    }}
                    className="nav-link-heavy"
                  >
                    giabonguyn11
                  </Link>
                </div>

                {/* Dòng 3 */}
                <div className="flex items-center gap-12">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset32.png"
                    alt="Contact icon 3"
                    width={58}
                    height={58}
                    className="object-contain"
                  />
                  <Link
                    href="https://www.instagram.com/repairpopular/"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: '"FivoSansHeavy", sans-serif',
                    }}
                    className="nav-link-heavy"
                  >
                    repairpopular
                  </Link>
                </div>

                {/* Dòng 4 */}
                <div className="flex items-center gap-12">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset33.png"
                    alt="Contact icon 4"
                    width={58}
                    height={58}
                    className="object-contain"
                  />
                  <Link
                    href="https://www.pixiv.net/en/users/99415611"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: '"FivoSansHeavy", sans-serif',
                    }}
                    className="nav-link-heavy"
                  >
                    Baooo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* OVERLAY HEADER: chỉ header bắt event, phần dưới không chặn click */}
      <div className="relative z-10 h-full w-full flex flex-col pointer-events-none">
        {/* Header: logo + 3 nút */}
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

            <PortfolioDropdown
              dropdownBgSrc="/WEB_ELEMENT/portfolio/Thumbnails/Asset56.png"
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

        {/* Phần filler không cần bắt event */}
        <div className="flex-1" />
      </div>
    </section>
  );
}
