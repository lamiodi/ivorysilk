"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ivorysilk:preloader-seen";
const MIN_VISIBLE_MS = 1600;

/**
 * One-time home preloader. Renders the atelier wordmark with a quiet
 * drape-in, holds briefly, then sweeps upward. Session storage ensures
 * the loader never re-plays during a single browsing session, so repeat
 * visitors get straight to the catalog.
 */
export function HomePreloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);

    // Hold the loader for at least MIN_VISIBLE_MS so the entrance animation
    // always plays fully before the exit sweep begins.
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, MIN_VISIBLE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden={!visible}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.85, ease: [0.83, 0, 0.17, 1] }
          }
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
        >
          {/* Subtle gold hairline that sweeps across the floor as the loader exits */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.4 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0 : 1, ease: [0.83, 0, 0.17, 1] }}
            className="absolute bottom-[18%] left-1/2 h-px w-32 -translate-x-1/2 origin-center bg-gold/60"
          />

          <div className="flex flex-col items-center gap-7 px-6">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.9, ease: [0.23, 1, 0.32, 1] }
              }
              className="relative h-20 w-20 sm:h-24 sm:w-24"
            >
              <Image
                src="/logo.png"
                alt="Ivory Silk Collective"
                fill
                priority
                sizes="96px"
                className="object-contain"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
              }
              className="text-2xl italic leading-none text-ink sm:text-3xl"
              style={{ fontFamily: "var(--font-script, 'Caveat', 'Dancing Script', cursive)" }}
            >
              atelier
            </motion.p>

            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-1 w-1 rounded-full bg-gold animate-pulse [animation-delay:-0.3s]" />
              <span className="h-1 w-1 rounded-full bg-gold animate-pulse [animation-delay:-0.15s]" />
              <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
