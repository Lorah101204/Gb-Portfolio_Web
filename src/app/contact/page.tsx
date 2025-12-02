"use client";

import Image from "next/image";
import Link from "next/link";
import PortfolioDropdown from "../components/PortfolioDropdown";

export default function ContactPage() {
  return (
    <section className="h-screen w-screen relative overflow-hidden">

      {/* 🌄 BACKGROUND + CONTENT */}
      <div className="absolute inset-0">
        <Image
          src="/WEB_ELEMENT/1x/Asset35.png"
          alt="Contact background"
          fill
          className="object-cover"
        />

        {/* 📌 CONTENT (center offset như bản gốc) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="max-w-4xl w-full"
            style={{
              transform: "translate(-65px, 130px)",
            }}
          >
            {/* GRID 2 CỘT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[520px] gap-y-[50px]">

              {/* Column 1 */}
              <div className="flex flex-col gap-[40px]">

                {/* Row 1 */}
                <div className="flex items-center gap-[53px]">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset30.png"
                    alt="Icon email"
                    width={58}
                    height={58}
                    className="object-contain shrink-0"
                  />
                  <Link
                    href="mailto:baong031103@gmail.com"
                    className="nav-link-heavy"
                    style={{ color: "#FFFFFF", fontFamily: '"FivoSansHeavy", sans-serif' }}
                  >
                    baong031103@gmail.com
                  </Link>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-[53px]">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset31.png"
                    alt="Icon Behance"
                    width={58}
                    height={58}
                    className="object-contain shrink-0"
                  />
                  <Link
                    href="https://www.behance.net/giabonguyn11"
                    className="nav-link-heavy"
                    style={{ color: "#FFFFFF", fontFamily: '"FivoSansHeavy", sans-serif' }}
                  >
                    giabonguyn11
                  </Link>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-[53px]">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset32.png"
                    alt="Icon IG"
                    width={58}
                    height={58}
                    className="object-contain shrink-0"
                  />
                  <Link
                    href="https://www.instagram.com/repairpopular/"
                    className="nav-link-heavy"
                    style={{ color: "#FFFFFF", fontFamily: '"FivoSansHeavy", sans-serif' }}
                  >
                    repairpopular
                  </Link>
                </div>

              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-[40px]">

                {/* Row 4 */}
                <div className="flex items-center gap-[53px]">
                  <Image
                    src="/WEB_ELEMENT/NEWDESIGN/aboutme/Asset 77.png"
                    alt="Icon LinkedIn"
                    width={58}
                    height={58}
                    className="object-contain shrink-0"
                  />
                  <Link
                    href="https://www.linkedin.com/in/b-ng-882aa7358/"
                    className="nav-link-heavy"
                    style={{ color: "#FFFFFF", fontFamily: '"FivoSansHeavy", sans-serif' }}
                  >
                    B NG
                  </Link>
                </div>

                {/* Row 5 */}
                <div className="flex items-center gap-[53px]">
                  <Image
                    src="/WEB_ELEMENT/1x/Asset33.png"
                    alt="Icon Pixiv"
                    width={58}
                    height={58}
                    className="object-contain shrink-0"
                  />
                  <Link
                    href="https://www.pixiv.net/en/users/99415611"
                    className="nav-link-heavy"
                    style={{ color: "#FFFFFF", fontFamily: '"FivoSansHeavy", sans-serif' }}
                  >
                    Baooo
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 🔥 HEADER OVERLAY — luôn nổi trên cùng */}
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

            <Link href="/contact" className="nav-link" style={{ color: "#F3762B" }}>
              Contact
            </Link>
          </div>
        </header>

        <div className="flex-1" />
      </div>

    </section>
  );
}
