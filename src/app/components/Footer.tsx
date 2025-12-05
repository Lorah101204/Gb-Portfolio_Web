"use client";

import { motion, MotionProps } from "framer-motion";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Props = MotionProps & React.ComponentPropsWithoutRef<typeof motion.footer>;

const Footer = React.forwardRef<HTMLElement, Props>(function Footer(props, ref) {
  const router = useRouter();
  const pathname = usePathname();

  // Thứ tự route giống layout.tsx
  const routeOrder = useMemo(
    () => [
      "/portfolio/branding-timeless",
      "/portfolio/branding-starbalm",
      "/portfolio/game-ga-va-ho",
      "/portfolio/game-echoes-of-time",
      "/portfolio/other-nike-lego",
      "/portfolio/other-play-magazine",
      "/portfolio/illustration",
    ],
    []
  );

  const currentIdx = routeOrder.indexOf(pathname);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;

  const goToPage = (idx: number) => {
    if (idx >= 0 && idx < routeOrder.length && idx !== currentIdx) {
      router.push(routeOrder[idx]);
    }
  };

  // 🟡 Config thanh slider (giống các page portfolio khác)
  const ITEM_WIDTH = 96; // width Asset37
  const GAP = 0; // khoảng cách giữa các item
  const SEGMENT = ITEM_WIDTH + GAP;
  const TRACK_WIDTH =
    ITEM_WIDTH * routeOrder.length + GAP * (routeOrder.length - 1);
  const knobLeft = safeIdx * SEGMENT;

  return (
    <motion.footer
      ref={ref}
      {...props}
      className={
        // 👉 Giữ lại py-26.5 như footer ban đầu để chiều cao giống hệt
        "w-full fixed bottom-0 left-0 z-40 bg-[#f6b8d3] border-t border-black/10 py-25.5 px-8 flex items-center justify-between" +
        (props.className ? " " + props.className : "")
      }
    >
      {/* 🔵 NÚT PREV - ĐẶT SÁT BÊN TRÁI FOOTER */}
      <button
        className="flex items-center justify-center px-3 py-2 rounded bg-white/70 text-black border border-black/20 hover:bg-white disabled:opacity-40 disabled:cursor-default"
        disabled={safeIdx <= 0}
        onClick={() => goToPage(safeIdx - 1)}
        aria-label="Previous page"
      >
        {/* TODO: Thay span này bằng <Image> nếu muốn dùng icon riêng
            Ví dụ:
            <Image src="/path/to/prev-icon.png" alt="Prev" width={24} height={24} />
        */}
        <span className="text-xl leading-none">←</span>
      </button>

      {/* 🟣 THANH SLIDER Ở GIỮA (Asset37 + Asset38) */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="relative flex items-center"
          style={{ width: TRACK_WIDTH, height: 0 }}
        >
          {routeOrder.map((route, idx) => (
            <button
              key={route}
              type="button"
              aria-label={`Go to page ${idx + 1}`}
              onClick={() => goToPage(idx)}
              disabled={idx === currentIdx}
              className="relative cursor-pointer disabled:opacity-100 disabled:cursor-default"
              style={{
                width: ITEM_WIDTH,
                marginRight: idx === routeOrder.length - 1 ? 0 : GAP,
              }}
            >
              {/* Ảnh nền của thanh slide (Asset38) */}
              <Image
                src="/WEB_ELEMENT/portfolio/Asset38.png"
                alt={`Slide ${idx + 1}`}
                width={ITEM_WIDTH}
                height={ITEM_WIDTH}
                className="object-contain"
              />
            </button>
          ))}

          {/* Nút Asset38 trượt theo slide hiện tại */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            initial={false}
            animate={{ left: knobLeft }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src="/WEB_ELEMENT/portfolio/Asset37.png"
              alt="Current page indicator"
              width={96}
              height={48}
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* 🔴 NÚT NEXT - ĐẶT SÁT BÊN PHẢI FOOTER */}
      <button
        className="flex items-center justify-center px-3 py-2 rounded bg-white/70 text-black border border-black/20 hover:bg-white disabled:opacity-40 disabled:cursor-default"
        disabled={safeIdx >= routeOrder.length - 1}
        onClick={() => goToPage(safeIdx + 1)}
        aria-label="Next page"
      >
        {/* TODO: Thay span này bằng <Image> nếu muốn dùng icon riêng
            Ví dụ:
            <Image src="/path/to/next-icon.png" alt="Next" width={24} height={24} />
        */}
        <span className="text-xl leading-none">→</span>
      </button>
    </motion.footer>
  );
});

export default Footer;
