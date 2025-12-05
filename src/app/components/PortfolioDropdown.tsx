"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type PortfolioDropdownProps = {
  triggerColor?: string;       // màu chữ nút "Portfolio"
  triggerClassName?: string;   // class thêm cho nút "Portfolio"

  dropdownBgSrc?: string;      // 👈 ảnh nền dropdown
  dropdownBgWidth?: number;    // 👈 width box dropdown
  dropdownBgHeight?: number;   // 👈 height box dropdown

  itemColor?: string;          // 👈 màu chữ item
  itemClassName?: string;      // 👈 class thêm cho item (font, size,...)
};

export default function PortfolioDropdown({
  triggerColor = "#F3762B",
  triggerClassName = "",

  dropdownBgSrc = "/WEB_ELEMENT/portfolio/Asset 45.png",
  dropdownBgWidth = 278,
  dropdownBgHeight = 309,

  itemColor = "#F3762B",
  itemClassName = "",
}: PortfolioDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Nút PORTFOLIO (màu linh động) */}
      <button
        type="button"
        className={`nav-link ${triggerClassName}`}
        style={{ color: triggerColor }}
        onClick={() => setOpen((v) => !v)}
      >
        Portfolio
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 mt-2 -translate-x-1/2 z-50"
          >
            <div
              className="relative"
              style={{ width: dropdownBgWidth, height: dropdownBgHeight }}
            >
              {/* BG ảnh asset36 (hoặc custom) */}
              <Image
                src={dropdownBgSrc}
                alt="Portfolio menu background"
                fill
                className="object-contain pointer-events-none"
              />

              {/* Nội dung list bên trong bg */}
              <div className="absolute inset-0 flex flex-col justify-center px-[53px] mt-10">
                <div className="flex flex-col space-y-[8px]">
                  {/* Branding: Timeless */}
                  <Link
                    href="/portfolio/branding-timeless"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Branding: Timeless
                  </Link>

                  {/* Branding: Starbalm */}
                  <Link
                    href="/portfolio/branding-starbalm"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Branding: Starbalm
                  </Link>

                  {/* Game: Ga va Ho */}
                  <Link
                    href="/portfolio/game-ga-va-ho"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Game: Ga va Ho
                  </Link>

                  {/* Game: Echoes of Time */}
                  <Link
                    href="/portfolio/game-echoes-of-time"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Game: Echoes of Time
                  </Link>

                  {/* Other: Nike x Lego */}
                  <Link
                    href="/portfolio/other-nike-lego"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Other: Nike x Lego
                  </Link>

                  {/* Other: Play Magazine */}
                  <Link
                    href="/portfolio/other-play-magazine"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Other: Play Magazine
                  </Link>

                  {/* Illustration */}
                  <Link
                    href="/portfolio/illustration"
                    className={`nav-link-dropdown block whitespace-nowrap ${itemClassName}`}
                    style={{ color: itemColor }}
                    onClick={() => setOpen(false)}
                  >
                    Illustration
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
