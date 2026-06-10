"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function AuthTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const direction = pathname === "/register" ? 1 : -1;

  useEffect(() => {
    if (pathname !== prevPathname) {
      console.log("Route changed from", prevPathname, "to", pathname);
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname]);

  return (
    <div className="relative overflow-hidden w-full">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
