"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PortfolioDropdown from "@/app/components/PortfolioDropdown"; // chỉnh path nếu khác

export default function HomePage() {
  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* 🔴 BACKGROUND FULL MÀN HÌNH */}
      <Image
        src="/WEB_ELEMENT/NEWDESIGN/newasset/BG.png"
        alt="background"
        fill
        priority
        className="object-cover"
      />

      {/* LỚP NỘI DUNG TRÊN BACKGROUND */}
      <div className="relative z-30 h-full w-full flex flex-col">
        {/* 🔴 HEADER */}
        <header
          className="
            w-full
            px-8 pt-6 pb-10
            flex justify-between items-start
          "
        >
          <div className="flex items-start">
            <Image
              src="/WEB_ELEMENT/Asset22x-8.png"
              alt="Art Portfolio Logo"
              width={210}
              height={131}
              className="object-contain mt-1"
            />
          </div>

          <div className="flex gap-10 items-start mt-4">
            <Link href="/" className="nav-link" style={{ color: "#19459D" }}>
              Home
            </Link>

            <Link
              href="/about-me"
              className="nav-link"
              style={{ color: "#19459D" }}
            >
              About
            </Link>

            <PortfolioDropdown
              triggerColor="#19459D"
              itemColor="#F3762B"
            />

            <Link
              href="/contact"
              className="nav-link"
              style={{ color: "#19459D" }}
            >
              Contact
            </Link>
          </div>
        </header>

        {/* 🔴 KHỐI 2 ẢNH + 1 VIDEO  */}
        <div className="flex-1 flex items-center px-20 pb-30">
          <div className="grid w-full gap-30 md:grid-cols-[1fr_1.5fr]">
            {/* 🔵 CỘT TRÁI: 2 ẢNH */}
            <div className="flex flex-col gap-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                className="relative w-full"
              >
                <Image
                  src="/WEB_ELEMENT/NEWDESIGN/newasset/TEXT1.png"
                  alt="Left top artwork"
                  width={725}
                  height={280}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
                className="relative w-full"
              >
                <Image
                  src="/WEB_ELEMENT/NEWDESIGN/newasset/TEXT2.png"
                  alt="Left bottom artwork"
                  width={743}
                  height={223}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

            {/* 🟣 CỘT PHẢI: VIDEO (đẩy sang phải + phóng to) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6,
              }}
              className="
                relative w-full 
                flex items-center justify-end 
                overflow-visible
              "
            >
              {/* 
                👉 Đây là wrapper chính của video:
                - w-[135%]: video rộng ~135% so với chiều rộng cột phải (phóng to).
                - max-w-none: không bị giới hạn bởi max-width mặc định.
                - translate-x-4 md:translate-x-10: đẩy video lệch sang phải.
              */}
                <div className="relative max-h-none max-w-none translate-x-0 w-full" style={{ marginTop: '-120px' }}>
                <video
                  src="/WEB_ELEMENT/NEWDESIGN/newasset/Gif.mp4"
                  autoPlay
                  muted
                  playsInline
                  loop
                  width={1002}
                  height={938}
                  className="w-full h-auto object-contain"
                />
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
