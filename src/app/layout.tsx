"use client";

import "./globals.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClickPops from "./components/ClickPops";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loadingDone, setLoadingDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // xác định page
  const isHomePage = pathname === "/";
  const isRootSlider = pathname === "/";
  const isContactPage = pathname === "/contact";
  const isAboutPage = pathname === "/about-me";

  // ===== LƯU ROUTE TRƯỚC ĐỂ XÁC ĐỊNH HƯỚNG OVERLAY =====
  const prevPathRef = useRef<string>(pathname);
  const firstRouteRef = useRef(true);

  const [overlayDir, setOverlayDir] = useState<"forward" | "back">("forward");
  const [showOverlay, setShowOverlay] = useState(false);

  // trạng thái ép ẩn navbar/footer từ portfolio page (click phóng to project name)
  const [forceHideBars, setForceHideBars] = useState(false);
  const hideBars = isHomePage || (isContactPage || isAboutPage) || forceHideBars;
  const router = useRouter();

  // The pages order we want to navigate using wheel when navbar/footer are visible
  const routeOrder = useMemo(() => [
    "/",
    "/portfolio/branding-timeless",
    "/portfolio/branding-starbalm",
    "/portfolio/game-ga-va-ho",
    "/portfolio/game-echoes-of-time",
    "/portfolio/other-nike-lego",
    "/portfolio/other-play-magazine",
    "/portfolio/illustration",
  ], []);

  const isNavigatingRef = useRef(false);

  // ❗ Navbar/Footer will be hidden when:
  // - user opens /contact
  // - or when a portfolio page sends a hidden = true event

  useEffect(() => {
    if (!loadingDone) return;

    if (firstRouteRef.current) {
      firstRouteRef.current = false;
      prevPathRef.current = pathname;
      return;
    }

    const prev = prevPathRef.current;
    // Use routeOrder to decide forward/back depending on the route indices
    const prevIdx = routeOrder.indexOf(prev);
    const nextIdx = routeOrder.indexOf(pathname);

    let dir: "forward" | "back" = "forward";
    if (prevIdx !== -1 && nextIdx !== -1) {
      dir = nextIdx >= prevIdx ? "forward" : "back";
    } else {
      if (prev === "/" && pathname !== "/") {
        dir = "forward";
      } else if (prev !== "/" && pathname === "/") {
        dir = "back";
      } else {
        dir = "forward";
      }
    }

    // Schedule the overlay operations in the next macrotask to avoid synchronous state updates
    setTimeout(() => {
      setOverlayDir(dir);
      setShowOverlay(true);
      prevPathRef.current = pathname;
    }, 0);

    // mỗi lần đổi route, reset ép ẩn bars (đề phòng quên bật lại)
    setTimeout(() => setForceHideBars(false), 0);
  }, [pathname, loadingDone, routeOrder]);

  // Layout-level wheel navigation between top-level pages (when bars visible)
  useEffect(() => {
    if (!loadingDone) return;

    const handler = (e: WheelEvent) => {
      // Only handle vertical scrolls and when NAV/FOOTER are visible
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (hideBars) return; // if bars hidden, let the page's wheel handler run
      if (isNavigatingRef.current) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const idx = routeOrder.indexOf(pathname);
      if (idx === -1) return; // not a route we handle

      let targetIdx = idx;
      if (e.deltaY > 0) {
        // scroll down -> next page
        targetIdx = Math.min(idx + 1, routeOrder.length - 1);
      } else if (e.deltaY < 0) {
        // scroll up -> previous page
        targetIdx = Math.max(idx - 1, 0);
      }

      if (targetIdx === idx) return; // no change

      isNavigatingRef.current = true;
      router.push(routeOrder[targetIdx]);
      // cooldown to avoid rapid consecutive navigation
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 700);
    };

    // Use capture so we intercept before page-level handlers, and passive: false so we can preventDefault
    window.addEventListener("wheel", handler, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handler as EventListener, true);
  }, [hideBars, pathname, loadingDone, routeOrder, router]);

  // ===== LẮNG NGHE EVENT TỪ CÁC PORTFOLIO PAGE ĐỂ ẨN / HIỆN NAVBAR, FOOTER =====
  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const custom = e as CustomEvent<{ hidden: boolean }>;
        if (typeof custom.detail?.hidden === "boolean") {
          setForceHideBars(custom.detail.hidden);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("portfolio-bars-toggle", handler as EventListener);
    return () => {
      window.removeEventListener("portfolio-bars-toggle", handler as EventListener);
    };
  }, []);

  // // ===== SCROLL DỌC -> NGANG: CHỈ Ở HOME, KHÔNG ẨN NAV/FOOTER NỮA =====
  // useEffect(() => {
  //   if (!loadingDone) return;
  //   if (!isHomePage) return;

  //   const el = scrollRef.current;
  //   if (!el) return;

  //   // reset scroll ngang khi vào Home
  //   el.scrollLeft = 0;

  //   const onWheel = (e: WheelEvent) => {
  //     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
  //       e.preventDefault();
  //       el.scrollLeft += e.deltaY * 0.6;
  //     }
  //   };

  //   el.addEventListener("wheel", onWheel, { passive: false });

  //   return () => {
  //     el.removeEventListener("wheel", onWheel as any);
  //   };
  // }, [loadingDone, isHomePage]);

  const barTransition = {
    duration: 0.4,
    ease: "easeOut",
  } as const;

  // ❗ Navbar/Footer sẽ ẩn khi:
  // - đang ở /contact
  // - HOẶC page portfolio gửi signal hidden = true

  return (
    <html lang="en">
      <body className="overflow-hidden">
        {!loadingDone && (
          <LoadingScreen onFinish={() => setLoadingDone(true)} />
        )}

        {loadingDone && (
          <>
            {/* 🔹 NAVBAR: luôn render, animate theo hideBars */}
            <Navbar
              initial={{ y: "-100%", opacity: 0 }}
              animate={hideBars ? { y: "-100%", opacity: 0 } : { y: "0%", opacity: 1 }}
              transition={barTransition}
              style={{ pointerEvents: hideBars ? "none" : "auto" }}
            />

            {/* CONTENT KHÔNG ANIM PAGE, CHỈ BỊ OVERLAY CHE */}
            <div className="h-screen w-screen overflow-hidden relative">
              <div
                  ref={isHomePage && !isRootSlider ? scrollRef : null}
                  className={
                    isHomePage && !isRootSlider
                      ? "h-full overflow-x-scroll overflow-y-hidden relative"
                      : "h-full overflow-hidden relative"
                  }
              >
                {isHomePage && !isRootSlider ? (
                  <main className="pb-32 flex min-w-[200vw]">
                    {children}
                  </main>
                ) : (
                  <main className="h-full w-full">
                    {children}
                  </main>
                )}
              </div>

              {/* OVERLAY TRƯỢT: BAN ĐẦU CHE FULL, SAU ĐÓ SLIDE RA */}
              <AnimatePresence>
                {showOverlay && (
                  <motion.div
                    key={`overlay-${pathname}-${overlayDir}`}
                    initial={{ x: 0 }} // che full, không thấy page mới
                    animate={{
                      x: overlayDir === "forward" ? "-100%" : "100%",
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onAnimationComplete={() => {
                      setShowOverlay(false);
                    }}
                    className="
                      fixed inset-0 z-[999]
                      bg-[#f6b8d3]
                    "
                  />
                )}
              </AnimatePresence>
            </div>

            {/* 🔹 FOOTER: luôn render, animate theo hideBars */}
            <Footer
              initial={{ y: "100%", opacity: 0 }}
              animate={hideBars ? { y: "100%", opacity: 0 } : { y: "0%", opacity: 1 }}
              transition={barTransition}
              style={{ pointerEvents: hideBars ? "none" : "auto" }}
            />
            {/* CLICK POPS: decorative pointer click effects */}
            <ClickPops />
          </>
        )}
      </body>
    </html>
  );
}
