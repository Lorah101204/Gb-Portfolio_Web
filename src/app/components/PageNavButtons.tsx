"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

/**
 * Variant để bạn đổi style / asset theo từng page.
 * Ví dụ:
 *  - "default"
 *  - "timeless"
 *  - "gavaho"
 *  - "illustration"
 *  - "other"
 */
export type PageNavVariant =
  | "default"
  | "timeless"
  | "gavaho"
  | "illustration"
  | "other";

type PageNavButtonsProps = {
  /**
   * Style/asset của nút theo page.
   * Bạn có thể truyền từ layout hoặc từng page:
   * <PageNavButtons variant="timeless" />
   */
  variant?: PageNavVariant;

  /**
   * Nếu muốn truyền icon trực tiếp (ưu tiên hơn variant):
   * - prevIconSrc: path ảnh nút Previous
   * - nextIconSrc: path ảnh nút Next
   *
   * Ví dụ:
   *  prevIconSrc="/WEB_ELEMENT/buttons/prev-timeless.png"
   *  nextIconSrc="/WEB_ELEMENT/buttons/next-timeless.png"
   */
  prevIconSrc?: string;
  nextIconSrc?: string;

  /**
   * Class cho wrapper bao 2 nút (để căn vị trí, margin, v.v.)
   * VD: "flex items-center justify-between w-full"
   */
  className?: string;
};

/**
 * Component: chỉ render 2 nút left/right để chuyển page.
 *  - Không chứa footer, không chứa slider.
 *  - Ẩn trên các page: "/", "/about-me", "/contact".
 *  - Ở page timeless: ẩn nút Prev.
 *  - Ở page illustration: ẩn nút Next.
 */
export const PageNavButtons: React.FC<PageNavButtonsProps> = ({
  variant = "default",
  prevIconSrc,
  nextIconSrc,
  className = "",
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Thứ tự route giống layout.tsx (chuỗi portfolio)
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

  // 🔴 Ẩn component trên Home / About / Contact
  if (pathname === "/" || pathname === "/about-me" || pathname === "/contact") {
    return null;
  }

  // ⭐ Timeless là page đầu tiên trong chuỗi portfolio
  const TIMELESS_INDEX = routeOrder.indexOf("/portfolio/branding-timeless");
  // ⭐ Illustration là page cuối cùng trong chuỗi portfolio
  const ILLU_INDEX = routeOrder.indexOf("/portfolio/illustration");

  const isFirstContentPage = safeIdx === TIMELESS_INDEX;
  const isLastContentPage = safeIdx === ILLU_INDEX;

  // 👇 Mapping icon theo variant nếu bạn KHÔNG truyền prevIconSrc/nextIconSrc
  const resolvePrevIcon = () => {
    if (prevIconSrc) return prevIconSrc;

    switch (variant) {
      case "timeless":
        return "/WEB_ELEMENT/buttons/prev-timeless.png";
      case "gavaho":
        return "/WEB_ELEMENT/buttons/prev-gavaho.png";
      case "other":
        return "/WEB_ELEMENT/buttons/prev-other.png";
      case "illustration":
        return "/WEB_ELEMENT/buttons/prev-illustration.png";
      case "default":
      default:
        return ""; // rỗng = dùng nút text fallback
    }
  };

  const resolveNextIcon = () => {
    if (nextIconSrc) return nextIconSrc;

    switch (variant) {
      case "timeless":
        return "/WEB_ELEMENT/buttons/next-timeless.png";
      case "gavaho":
        return "/WEB_ELEMENT/buttons/next-gavaho.png";
      case "illustration":
        return "/WEB_ELEMENT/buttons/next-illustration.png";
      case "other":
        return "/WEB_ELEMENT/buttons/next-other.png";
      case "default":
      default:
        return ""; // rỗng = dùng nút text fallback
    }
  };

  const prevIcon = resolvePrevIcon();
  const nextIcon = resolveNextIcon();

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* NÚT PREV */}
      {isFirstContentPage ? (
        // 👉 Trang timeless: bỏ nút Prev.
        // Nếu muốn giữ layout cân đối, giữ 1 div placeholder cùng width:
        <div style={{ width: 147, height: 119 }} />
      ) : (
        <button
          type="button"
          disabled={safeIdx <= 0}
          onClick={() => goToPage(safeIdx - 1)}
          aria-label="Previous page"
          className="
            flex items-center justify-center rounded 
            disabled:opacity-40 disabled:cursor-default
            opacity-90 hover:opacity-80 active:opacity-100
            active:scale-95
            transition-all duration-150
          "
        >
          {prevIcon ? (
            // 👉 TODO: thay path icon ở resolvePrevIcon ở trên
            <Image
              src={prevIcon}
              alt="Previous"
              width={147} // chỉnh size nút ở đây
              height={119}
              className="object-contain"
            />
          ) : (
            // 👉 Fallback nếu chưa set icon: dùng text ←
            <span className="text-xl leading-none px-3 py-2 bg-white/70 border border-black/20 rounded hover:bg-white">
              ←
            </span>
          )}
        </button>
      )}

      {/* NÚT NEXT */}
      {isLastContentPage ? (
        // 👉 Trang illustration: bỏ nút Next.
        <div style={{ width: 147, height: 119 }} />
      ) : (
        <button
          type="button"
          disabled={safeIdx >= routeOrder.length - 1}
          onClick={() => goToPage(safeIdx + 1)}
          aria-label="Next page"
          className="
            flex items-center justify-center rounded 
            disabled:opacity-40 disabled:cursor-default
            opacity-90 hover:opacity-80 active:opacity-100
            active:scale-95
            transition-all duration-150
          "
        >
          {nextIcon ? (
            // 👉 TODO: thay path icon ở resolveNextIcon ở trên
            <Image
              src={nextIcon}
              alt="Next"
              width={147} // chỉnh size nút ở đây
              height={119}
              className="object-contain"
            />
          ) : (
            // 👉 Fallback nếu chưa set icon: dùng text →
            <span className="text-xl leading-none px-3 py-2 bg-white/70 border border-black/20 rounded hover:bg-white">
              →
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default PageNavButtons;
