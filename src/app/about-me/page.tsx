"use client";

import Image from "next/image";
import Link from "next/link";
import PortfolioDropdown from "../components/PortfolioDropdown";

export default function AboutPage() {
  return (
    <section className="h-screen w-screen relative overflow-hidden">
      
      {/* 🌄 BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/WEB_ELEMENT/1x/Asset39.png"
          alt="About background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 🔥 HEADER OVERLAY — luôn nằm trên */}
      <div className="relative z-10 h-full w-full flex flex-col pointer-events-none">

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
              alt="Logo"
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

        <div className="flex-1" />
      </div>

    </section>
  );
}
