import { motion, MotionProps } from "framer-motion";
import React from "react";

type Props = MotionProps & React.ComponentPropsWithoutRef<typeof motion.footer>;

const Footer = React.forwardRef<HTMLElement, Props>(function Footer(props, ref) {
  return (
    <motion.footer
      ref={ref}
      {...props}
      className={
        "w-full fixed bottom-0 left-0 z-40 bg-[#f6b8d3] border-t border-black/10 py-33 " +
        (props.className ?? "")
      }
    />
  );
});

export default Footer;
