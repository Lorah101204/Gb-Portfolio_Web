import Image from "next/image";
import Link from "next/link";
import PortfolioDropdown from "./PortfolioDropdown";
import { motion, MotionProps } from "framer-motion";
import React from "react";

type Props = MotionProps & React.ComponentPropsWithoutRef<typeof motion.nav>;

const Navbar = React.forwardRef<HTMLElement, Props>(function Navbar(props, ref) {
  return (
    <motion.nav
      ref={ref}
      {...props}
      className={
        "w-full fixed top-0 z-50 bg-[#f6b8d3] border-b border-black/10 px-8 pt-6 pb-20 flex justify-between items-start " +
        (props.className ?? "")
      }
    >
      <div className="flex items-start">
        <Image
          src="/WEB_ELEMENT/Asset22x-8.png"
          alt="Art Portfolio"
          width={210}
          height={131}
          className="object-contain mt-1"
        />
      </div>

      <div className="flex gap-10 items-start mt-4">
        <Link href="/" className="nav-link">
          Home
        </Link>

        <Link href="/about-me" className="nav-link">
          About
        </Link>

        <PortfolioDropdown 
          triggerColor="#19459D" 
        />

        <Link href="/contact" className="nav-link">
          Contact
        </Link>
      </div>
    </motion.nav>
  );
});

export default Navbar;
