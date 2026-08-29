"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered editorial reveal: a single calm rise, once, when the
 * section enters the viewport. Content is *visible by default* — the
 * motion only adds a soft rise on top — so a slow phone or hydration
 * delay never leaves the page looking empty.
 *
 * Disabled entirely under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
