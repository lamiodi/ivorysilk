"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Catalog entrance reveal. A short, capped stagger: enough to feel composed,
 * never slow enough to block browsing. Collapses to static under
 * prefers-reduced-motion.
 */
export function GridReveal({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
